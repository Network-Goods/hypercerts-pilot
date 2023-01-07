import { useToast } from "@chakra-ui/react";
import { BigNumber, BigNumberish, Bytes, BytesLike } from "ethers";
import { useParseBlockchainError } from "../utils/parseBlockchainError";
import { mintInteractionLabels } from "../content/chainInteractions";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { HyperCertMinterFactory } from "@network-goods/hypercerts-sdk";
import { CONTRACT_ADDRESS } from "../constants";
import { useState } from "react";
import { encodeBytes } from "cborg/lib/2bytes";

export interface MintHypercertArgs {
  units: BigNumberish;
  uri: string;
}

export interface MintHypercertWithAllowlistArgs {
  units: BigNumberish;
  merkleRoot: string;
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
  const [step, setStep] = useState<
    "initial" | "preparing" | "writing" | "awaiting" | "complete"
  >("initial");
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
      setStep("writing");
    },
    enabled,
  });

  const {
    data,
    write,
    error: writeError,
    isError: isWriteError,
    isLoading: isLoadingContractWrite,
    status,
  } = useContractWrite(config);
  console.log(status);

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

  return {
    write: async () => {
      setStep("preparing");
      await write?.();
    },
    isLoading:
      isLoadingPrepareContractWrite ||
      isLoadingContractWrite ||
      isLoadingWaitForTransaction,
    isError: isPrepareError || isWriteError || isWaitError,
    error: prepareError || writeError || waitError,
    step,
  };
};

export const useMintHyperCertificateWithAllowlist = ({
  onComplete,
  args,
  enabled,
}: {
  onComplete?: () => void;
  args: MintHypercertWithAllowlistArgs;
  enabled: boolean;
}) => {
  const [step, setStep] = useState<
    "initial" | "preparing" | "writing" | "awaiting" | "complete"
  >("initial");
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
    args: [
      BigNumber.from(args.units),
      args.merkleRoot as `0x${string}`,
      args.uri,
    ],
    abi: HyperCertMinterFactory.abi,
    functionName: "createAllowlist",
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
    enabled,
  });

  const {
    data,
    write,
    error: writeError,
    isError: isWriteError,
    isLoading: isLoadingContractWrite,
    status,
  } = useContractWrite(config);
  console.log(status);

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

  return {
    write: async () => {
      setStep("preparing");
      await write?.();
    },
    isLoading:
      isLoadingPrepareContractWrite ||
      isLoadingContractWrite ||
      isLoadingWaitForTransaction,
    isError: isPrepareError || isWriteError || isWaitError,
    error: prepareError || writeError || waitError,
    step,
  };
};
