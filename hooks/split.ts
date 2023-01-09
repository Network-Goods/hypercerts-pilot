import { splitInteractionLabels } from "../content/chainInteractions";
import { useHypercertContract } from "./contracts";
import { useToast } from "@chakra-ui/react";
import { useParseBlockchainError } from "../utils/parseBlockchainError";
import { useContractWrite } from "wagmi";

export const useSplitFraction = ({
  onComplete,
  onError,
}: {
  onComplete?: () => void;
  onError?: () => void;
}) => {
  const contract = useHypercertContract();
  const parseBlockchainError = useParseBlockchainError();
  const toast = useToast();

  // const { mutate: split } = useContractWrite(contract, "splitValue", {
  //   onConfirmation: () => {
  //     toast({
  //       status: "success",
  //       description: splitInteractionLabels.toastSuccess,
  //     });
  //     onComplete?.();
  //   },
  //   onError: (error) => {
  //     toast({
  //       description: parseBlockchainError(
  //         error,
  //         splitInteractionLabels.toastError
  //       ),
  //       status: "error",
  //     });
  //     console.error(error);
  //     onError?.();
  //   },
  // });

  // return split;
  return () => {
    console.log("Splitting");
  };
};
