import { useTypedContract } from "@raidguild/quiver";
import { HyperCertMinter__factory } from "../contract-types";
import { CONTRACT_ADDRESS } from "../constants";

export const useHypercertContract = () => {
  const { contract } = useTypedContract(
    CONTRACT_ADDRESS,
    HyperCertMinter__factory
  );

  return contract;
};
