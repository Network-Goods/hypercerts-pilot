import { utils } from "ethers";

export const hashLeaf = (address: string, units: number) => {
  return utils.solidityKeccak256(["address", "uint256"], [address, units]);
};
