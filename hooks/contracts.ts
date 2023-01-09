import { CONTRACT_ADDRESS } from "../constants";
import { HypercertMinterABI } from "@network-goods/hypercerts-sdk";
import { useContract, useProvider } from "wagmi";

export const useHypercertContract = () => {
  const provider = useProvider();
  return useContract({
    address: CONTRACT_ADDRESS,
    abi: HypercertMinterABI,
    signerOrProvider: provider,
    // signerOrProvider: {
    //
    // }
    // staticProvider: {
    //   enable: true,
    //   chainId: DEFAULT_CHAIN_ID,
    // },
  });
};
