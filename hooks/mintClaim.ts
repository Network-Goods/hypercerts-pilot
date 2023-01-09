import { useEffect, useState } from "react";
import {
  HypercertMetadata,
  HyperCertMinterFactory,
  storeMetadata,
} from "@network-goods/hypercerts-sdk";
import { useContractModal } from "../components/ContractInteractionModalContext";
import { useParseBlockchainError } from "../utils/parseBlockchainError";
import { useToast } from "@chakra-ui/react";
import { client } from "../utils/ipfsClient";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_ADDRESS } from "../constants";
import { BigNumber } from "ethers";
import { mintInteractionLabels } from "../content/chainInteractions";

export const useMintClaim = ({
  onComplete,
  enabled,
}: {
  onComplete?: () => void;
  enabled: boolean;
}) => {
  const [cidUri, setCidUri] = useState<string>();
  const [units, setUnits] = useState<number>();

  const stepDescriptions = {
    uploading: "Uploading metadata to ipfs",
    writing: "Minting hypercert on-chain",
    complete: "Done minting",
  };

  const { setStep, showModal } = useContractModal();
  const parseBlockchainError = useParseBlockchainError();
  const toast = useToast();

  const initializeWrite = async (
    metaData: HypercertMetadata,
    units: number
  ) => {
    if (enabled) {
      setUnits(units);
      setStep("uploading");
      const cid = await storeMetadata(metaData, client);
      setCidUri(cid);
    }
  };

  const parseError = useParseBlockchainError();
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isLoading: isLoadingPrepareContractWrite,
    isSuccess: isReadyToWrite,
  } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    args: [BigNumber.from(units || 0), cidUri!],
    abi: HyperCertMinterFactory.abi,
    functionName: "mintClaim",
    onError: (error) => {
      parseError(error, "the fallback");
      toast({
        description: parseBlockchainError(
          error,
          mintInteractionLabels.toastError
        ),
        status: "error",
      });
      console.error(error);
    },
    onSuccess: () => {
      toast({
        description: mintInteractionLabels.toastSuccess("Success"),
        status: "success",
      });
      setStep("writing");
    },
    enabled: !!cidUri && units !== undefined,
  });

  const {
    data,
    writeAsync,
    error: writeError,
    isError: isWriteError,
    isLoading: isLoadingContractWrite,
  } = useContractWrite(config);

  const {
    isLoading: isLoadingWaitForTransaction,
    isError: isWaitError,
    error: waitError,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      toast({
        description: mintInteractionLabels.toastSuccess("Success"),
        status: "success",
      });
      setStep("complete");
      onComplete?.();
    },
    enabled,
  });

  useEffect(() => {
    const perform = async () => {
      if (isReadyToWrite && writeAsync) {
        await writeAsync();
      }
    };
    perform();
  }, [isReadyToWrite]);

  return {
    write: async (metaData: HypercertMetadata, units: number) => {
      showModal({ stepDescriptions });
      setStep("preparing");
      await initializeWrite(metaData, units);
    },
    isLoading:
      isLoadingPrepareContractWrite ||
      isLoadingContractWrite ||
      isLoadingWaitForTransaction,
    isError: isPrepareError || isWriteError || isWaitError,
    error: prepareError || writeError || waitError,
    isReadyToWrite,
  };
};
