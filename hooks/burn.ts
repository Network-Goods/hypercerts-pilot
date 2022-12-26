import { useHypercertContract } from "./contracts";
import { useWallet, useWriteContract } from "@raidguild/quiver";
import { useToast } from "@chakra-ui/react";
import { burnInteractionLabels } from "../content/chainInteractions";
import { useParseBlockchainError } from "../utils/parseBlockchainError";
import { burnFractionModal } from "../content/burn-hypercert-content";

export const useBurnFraction = ({
  onComplete,
  onError,
}: {
  onComplete?: () => void;
  onError?: () => void;
}) => {
  const { address } = useWallet();
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
      onError?.();
    },
    onConfirmation: (receipt) => {
      toast({
        description: burnInteractionLabels.toastSuccess(
          receipt.transactionHash
        ),
        status: "success",
      });
      onComplete?.();
    },
  });

  return async (tokenId: string, valueBurned: number) => {
    if (!address) {
      toast({
        description: burnFractionModal.error.noWalletConnected,
        status: 'error',
      })
      return;
    }
    return mutate(address, tokenId, valueBurned);
  }
};
