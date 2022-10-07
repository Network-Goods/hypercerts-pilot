import { mergeInteractionLabels } from "../content/chainInteractions";
import { useHypercertContract } from "./contracts";
import { useWriteContract } from "@raidguild/quiver";
import { useToast } from "@chakra-ui/react";
import { useParseBlockchainError } from "../utils/parseBlockchainError";

export const useMergeFractions = ({
  onComplete,
  onError,
}: {
  onComplete?: () => void;
  onError?: () => void;
}) => {
  const contract = useHypercertContract();
  const parseBlockchainError = useParseBlockchainError();
  const toast = useToast();

  const { mutate: merge } = useWriteContract(contract, "merge", {
    onConfirmation: () => {
      toast({
        status: "success",
        description: mergeInteractionLabels.toastSuccess,
      });
      onComplete?.();
    },
    onError: (error) => {
      toast({
        description: parseBlockchainError(
          error,
          mergeInteractionLabels.toastError
        ),
        status: "error",
      });
      console.error(error);
      onError?.();
    },
  });

  return merge;
};
