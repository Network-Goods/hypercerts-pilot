import { useTypedContract } from "@raidguild/quiver";
import { CONTRACT_ADDRESS, DEFAULT_CHAIN_ID } from "../constants";
import { HyperCertMinterFactory } from '@network-goods/hypercerts-protocol';

export const useHypercertContract = () => {
  const { contract } = useTypedContract(
    CONTRACT_ADDRESS,
    HyperCertMinterFactory,
    {
      staticProvider: {
        enable: true,
        chainId: DEFAULT_CHAIN_ID,
      },
    }
  );

  return contract;
};
