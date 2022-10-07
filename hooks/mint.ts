import { MintCertificateData } from "../types/MintCertificateData";
import { useWallet, useWriteContract } from "@raidguild/quiver";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useParseBlockchainError } from "../utils/parseBlockchainError";
import { useHypercertContract } from "./contracts";
import { mintInteractionLabels } from "../content/chainInteractions";

export const useMintHyperCertificate = ({
  onComplete,
}: {
  onComplete?: () => void;
}) => {
  const { address } = useWallet();
  const contract = useHypercertContract();
  const parseBlockchainError = useParseBlockchainError();
  const toast = useToast();

  const parseError = useParseBlockchainError();

  const { mutate } = useWriteContract(contract, "mint", {
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
    onConfirmation: (receipt) => {
      toast({
        description: mintInteractionLabels.toastSuccess(
          receipt.transactionHash
        ),
        status: "success",
      });
      onComplete?.();
    },
  });

  const encodeData = (data: MintCertificateData) => {
    const abiCoder = new ethers.utils.AbiCoder();
    const types = [
      "uint256[]",
      "uint256[]",
      "uint256[]",
      "uint64[2]",
      "uint64[2]",
      "address[]",
      "string",
      "string",
      "string",
      "uint64[]",
    ];
    const values = [
      data.rightsIds,
      data.workScopeIds,
      data.impactScopeIds,
      data.workTime,
      data.impactTime,
      data.contributors,
      data.name,
      data.description,
      data.uri,
      data.fractions,
    ];

    return abiCoder.encode(types, values);
  };

  return (data: MintCertificateData) => {
    return mutate(address!, encodeData(data));
  };
};
