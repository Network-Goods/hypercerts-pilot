import { MintCertificateData } from "../types/MintCertificateData";
import {
  useTypedContract,
  useWallet,
  useWriteContract,
} from "@raidguild/quiver";
import { HypercertMinterV0__factory } from "../contract-types";
import { requireEnv } from "../utils/requireEnv";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { parseBlockchainError } from "../utils/parseBlockchainError";

export const useMintHyperCertificate = () => {
  const { address } = useWallet();
  const contractAddress = requireEnv(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    "NEXT_PUBLIC_CONTRACT_ADDRESS"
  );
  const { contract } = useTypedContract(
    contractAddress,
    HypercertMinterV0__factory
  );

  const toast = useToast();

  const { mutate } = useWriteContract(contract, "mint", {
    onError: (error) => {
      toast({
        description: parseBlockchainError(
          error,
          "Something went wrong while minting the certificate"
        ),
        status: "error",
      });
      console.error(error);
    },
    onConfirmation: (receipt) => {
      toast({
        description: `Certificate ${receipt.transactionHash} successfully minted`,
        status: "success",
      });
    },
  });

  const encodeData = (data: MintCertificateData) => {
    const abiCoder = new ethers.utils.AbiCoder();
    const types = [
      "uint256[]",
      "uint256[]",
      "uint256[]",
      "uint256[2]",
      "uint256[2]",
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
