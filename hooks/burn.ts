import { useHypercertContract } from "./contracts";
import { useWallet, useWriteContract } from "@raidguild/quiver";
import { useToast } from "@chakra-ui/react";
import { parseBlockchainError } from "../utils/parseBlockchainError";

export const useBurnHypercert = () => {
  const contract = useHypercertContract();
  const { address } = useWallet();
  const toast = useToast();

  const { mutate } = useWriteContract(contract, "burn", {
    onError: (error) => {
      toast({
        description: parseBlockchainError(
          error,
          "Something went wrong while burning the certificate"
        ),
        status: "error",
      });
      console.error(error);
    },
    onConfirmation: (receipt) => {
      toast({
        description: `Certificate ${receipt.transactionHash} successfully burned`,
        status: "success",
      });
    },
  });

  return async (id: string, amount: string) => mutate(address!, id, amount);
};