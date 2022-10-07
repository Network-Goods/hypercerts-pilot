import { useHypercertContract } from "./contracts";
import { useWriteContract } from "@raidguild/quiver";
import { useToast } from "@chakra-ui/react";
import { burnInteractionLabels } from "../content/chainInteractions";
import { useParseBlockchainError } from "../utils/parseBlockchainError";

export const useBurnHypercert = () => {
  const contract = useHypercertContract();
  const parseBlockchainError = useParseBlockchainError();
  const toast = useToast();

  const { mutate } = useWriteContract(contract, "burn", {
    onError: (error) => {
      toast({
        description: parseBlockchainError(
          error,
          burnInteractionLabels.toastError
        ),
        status: "error",
      });
      console.error(error);
    },
    onConfirmation: (receipt) => {
      toast({
        description: burnInteractionLabels.toastSuccess(
          receipt.transactionHash
        ),
        status: "success",
      });
    },
  });

  return async (id: string) => mutate(id);
};
