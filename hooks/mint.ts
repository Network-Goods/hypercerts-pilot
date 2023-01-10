import { useToast } from "@chakra-ui/react";
import { BigNumber, BigNumberish, Bytes, BytesLike, ethers } from "ethers";
import { useParseBlockchainError } from "../utils/parseBlockchainError";
import { mintInteractionLabels } from "../content/chainInteractions";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  HyperCertMinterFactory,
  storeMetadata,
} from "@network-goods/hypercerts-sdk";
import { CONTRACT_ADDRESS } from "../constants";
import { useEffect, useState } from "react";
import { formatBytes32String, parseBytes32String } from "ethers/lib/utils";
import { useContractModal } from "../components/ContractInteractionModalContext";
import { client } from "../utils/ipfsClient";
import _ from "lodash";
import { HyperCertMetadata } from "../contract-types";

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

  const argsForContract = [
    args.proof as `0x{string}`[],
    BigNumber.from(args.claimID),
    BigNumber.from(args.units),
  ];
  console.log("args: ", argsForContract);

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
