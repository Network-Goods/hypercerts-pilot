import { BigNumber, BigNumberish } from "ethers";
import { useContractModal } from "../components/ContractInteractionModalContext";
import { useParseBlockchainError } from "../utils/parseBlockchainError";
import { useToast } from "@chakra-ui/react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACT_ADDRESS } from "../constants";
import {
  HypercertMetadata,
  HyperCertMinterFactory,
  storeMetadata,
} from "@network-goods/hypercerts-sdk";
import { mintInteractionLabels } from "../content/chainInteractions";
import { useEffect, useState } from "react";
import { client } from "../utils/ipfsClient";

export const useMintClaimAllowlist = ({
  onComplete,
  enabled,
}: {
  onComplete?: () => void;
  enabled: boolean;
}) => {
  const [cidUri, setCidUri] = useState<string>();
  const [units, setUnits] = useState<number>();
  const [merkleRoot, setMerkleRoot] = useState<`0x{string}`>();

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
    units: number,
    merkleRoot: `0x{string}`
  ) => {
    if (enabled) {
      setUnits(units);
      setStep("uploading");
      const cid = await storeMetadata(metaData, client);
      setCidUri(cid);
      setMerkleRoot(merkleRoot);
    }
  };

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isLoading: isLoadingPrepareContractWrite,
    isSuccess: isReadyToWrite,
  } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    args: [BigNumber.from(units || 0), merkleRoot!, cidUri!],
    abi: HyperCertMinterFactory.abi,
    functionName: "createAllowlist",
    onError: (error) => {
      parseBlockchainError(error, "the fallback");
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
    enabled: !!cidUri && units !== undefined && merkleRoot !== undefined,
  });

  const {
    data,
    error: writeError,
    isError: isWriteError,
    isLoading: isLoadingContractWrite,
    writeAsync,
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
    write: async (
      metaData: HypercertMetadata,
      units: number,
      merkleRoot: `0x{string}`
    ) => {
      showModal({ stepDescriptions });
      setStep("preparing");
      await initializeWrite(metaData, units, merkleRoot);
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
