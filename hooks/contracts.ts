import { requireEnv } from "../utils/requireEnv";
import { useTypedContract } from "@raidguild/quiver";
import { HypercertMinterV0__factory } from "../contract-types";

export const useHypercertContract = () => {
  const contractAddress = requireEnv(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    "NEXT_PUBLIC_CONTRACT_ADDRESS"
  );
  const { contract } = useTypedContract(
    contractAddress,
    HypercertMinterV0__factory
  );

  return contract;
};
