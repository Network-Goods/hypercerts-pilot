import { useToast } from "@chakra-ui/react";
import { BigNumber, BigNumberish } from "ethers";
import { useParseBlockchainError } from "../utils/parseBlockchainError";
import { mintInteractionLabels } from "../content/chainInteractions";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { HyperCertMinterFactory } from "@network-goods/hypercerts-sdk";
import { CONTRACT_ADDRESS } from "../constants";

export interface MintHypercertArgs {
  units: BigNumberish;
  uri: string;
}

export const useMintHyperCertificate = ({
  onComplete,
  args,
  enabled,
}: {
  onComplete?: () => void;
  args: MintHypercertArgs;
  enabled: boolean;
}) => {
  const parseBlockchainError = useParseBlockchainError();
  const toast = useToast();

  const parseError = useParseBlockchainError();
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isLoading: isLoadingPrepareContractWrite,
  } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    args: [BigNumber.from(args.units), args.uri],
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
    },
    enabled,
  });

  const {
    data,
    write,
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
      onComplete?.();
    },
  });

  return {
    write,
    isLoading:
      isLoadingPrepareContractWrite ||
      isLoadingContractWrite ||
      isLoadingWaitForTransaction,
    isError: isPrepareError || isWriteError || isWaitError,
    error: prepareError || writeError || waitError,
  };
};
