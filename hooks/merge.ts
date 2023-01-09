import { mergeInteractionLabels } from "../content/chainInteractions";
import { useHypercertContract } from "./contracts";
import { useToast } from "@chakra-ui/react";
import { useParseBlockchainError } from "../utils/parseBlockchainError";
import { useContractWrite } from "wagmi";

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

  // const { mutate: merge } = useContractWrite(contract, "mergeValue", {
  //   onConfirmation: () => {
  //     toast({
  //       status: "success",
  //       description: mergeInteractionLabels.toastSuccess,
  //     });
  //     onComplete?.();
  //   },
  //   onError: (error) => {
  //     toast({
  //       description: parseBlockchainError(
  //         error,
  //         mergeInteractionLabels.toastError
  //       ),
  //       status: "error",
  //     });
  //     console.error(error);
  //     onError?.();
  //   },
  // });

  return () => console.log("Merging");
};
