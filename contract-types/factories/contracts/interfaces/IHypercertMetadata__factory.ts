/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IHypercertMetadata,
  IHypercertMetadataInterface,
} from "../../../contracts/interfaces/IHypercertMetadata";
import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "slotId",
        type: "uint256",
      },
    ],
    name: "generateSlotURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "slotId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "generateTokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IHypercertMetadata__factory {
  static readonly abi = _abi;
  static createInterface(): IHypercertMetadataInterface {
    return new utils.Interface(_abi) as IHypercertMetadataInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IHypercertMetadata {
    return new Contract(address, _abi, signerOrProvider) as IHypercertMetadata;
  }
}