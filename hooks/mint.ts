import { MintCertificateData } from "../types/MintCertificateData";
import { useWallet, useWriteContract } from "@raidguild/quiver";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { parseBlockchainError } from "../utils/parseBlockchainError";
import { useHypercertContract } from "./contracts";
import { mintInteractionLabels } from "../content/chainInteractions";

export const useMintHyperCertificate = ({
  onComplete,
}: {
  onComplete?: () => void;
}) => {
  const { address } = useWallet();
  const contract = useHypercertContract();
  const toast = useToast();

  const { mutate } = useWriteContract(contract, "mint", {
    onError: (error) => {
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
    ];
    const values = [
      data.rightsIds,
      data.workScopeIds,
      data.impactScopeIds,
      data.workTime,
      data.impactTime,
      data.creators,
      data.uri,
    ];
    return abiCoder.encode(types, values);
  };

  return (data: MintCertificateData) => mutate(address!, 1, encodeData(data));
};
