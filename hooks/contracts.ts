import { useTypedContract } from "@raidguild/quiver";
import { HyperCertMinter__factory } from "../contract-types";
import { CONTRACT_ADDRESS, DEFAULT_CHAIN_ID } from "../constants";

export const useHypercertContract = () => {
  const { contract } = useTypedContract(
    CONTRACT_ADDRESS,
    HyperCertMinter__factory,
    {
      staticProvider: {
        enable: true,
        chainId: DEFAULT_CHAIN_ID,
      },
    }
  );

  return contract;
};
