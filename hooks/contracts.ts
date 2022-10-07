import { useTypedContract } from "@raidguild/quiver";
import { HypercertMinter__factory } from "../contract-types";
import { CONTRACT_ADDRESS } from "../constants";

export const useHypercertContract = () => {
  const { contract } = useTypedContract(
    CONTRACT_ADDRESS,
    HypercertMinter__factory
  );

  return contract;
};
