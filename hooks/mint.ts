import { useToast } from "@chakra-ui/react";
import { BigNumber, BigNumberish, Bytes, BytesLike, ethers } from "ethers";
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
import { formatBytes32String, parseBytes32String } from "ethers/lib/utils";

export interface MintHypercertArgs {
  units: BigNumberish;
  uri: string;
}

export interface MintHypercertWithAllowlistArgs {
  units: BigNumberish;
  merkleRoot: string;
  uri: string;
}

export interface MintHypercertAllowlistEntryArgs {
  proof: string[];
  claimID: BigNumberish;
  units: BigNumberish;
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
    isSuccess: isReadyToWrite,
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
    enabled,
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
    isReadyToWrite,
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
    isSuccess: isReadyToWrite,
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
    error: writeError,
    isError: isWriteError,
    isLoading: isLoadingContractWrite,
    status,
    writeAsync,
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
      console.log("Started writing");
      await writeAsync?.();
    },
    isLoading:
      isLoadingPrepareContractWrite ||
      isLoadingContractWrite ||
      isLoadingWaitForTransaction,
    isError: isPrepareError || isWriteError || isWaitError,
    error: prepareError || writeError || waitError,
    step,
    isReadyToWrite,
  };
};

export const useMintHyperCertificateAllowlistEntry = ({
  onComplete,
  args,
  enabled,
}: {
  onComplete?: () => void;
  args: MintHypercertAllowlistEntryArgs;
  enabled: boolean;
}) => {
  const [step, setStep] = useState<
    "initial" | "preparing" | "writing" | "awaiting" | "complete"
  >("initial");
  const parseBlockchainError = useParseBlockchainError();
  const toast = useToast();

  console.log("args: ", args);
  console.log(
    args.proof,
    args.proof.map((p) => parseBytes32String(p))
  );

  const parseError = useParseBlockchainError();
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isLoading: isLoadingPrepareContractWrite,
    isSuccess: isReadyToWrite,
  } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    args: [
      args.proof as `0x{string}`[],
      BigNumber.from(args.claimID),
      BigNumber.from(args.units),
    ],
    abi: HyperCertMinterFactory.abi,
    functionName: "mintClaimFromAllowlist",
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
    error: writeError,
    isError: isWriteError,
    isLoading: isLoadingContractWrite,
    status,
    writeAsync,
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
      console.log("Started writing");
      await writeAsync?.();
    },
    isLoading:
      isLoadingPrepareContractWrite ||
      isLoadingContractWrite ||
      isLoadingWaitForTransaction,
    isError: isPrepareError || isWriteError || isWaitError,
    error: prepareError || writeError || waitError,
    step,
    isReadyToWrite,
  };
};
