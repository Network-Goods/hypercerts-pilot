/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  ERC721Upgradeable,
  ERC721UpgradeableInterface,
} from "../../../../../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable";
import type { PromiseOrValue } from "../../../../../common";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061122c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101c3578063b88d4fde146101d6578063c87b56dd146101e9578063e985e9c5146101fc57600080fd5b80636352211e1461018757806370a082311461019a57806395d89b41146101bb57600080fd5b8063095ea7b3116100bd578063095ea7b31461014c57806323b872dd1461016157806342842e0e1461017457600080fd5b806301ffc9a7146100e457806306fdde031461010c578063081812fc14610121575b600080fd5b6100f76100f2366004610e1d565b610238565b60405190151581526020015b60405180910390f35b61011461028a565b6040516101039190610e8a565b61013461012f366004610e9d565b61031c565b6040516001600160a01b039091168152602001610103565b61015f61015a366004610ed2565b610343565b005b61015f61016f366004610efc565b61047b565b61015f610182366004610efc565b6104f3565b610134610195366004610e9d565b61050e565b6101ad6101a8366004610f38565b610573565b604051908152602001610103565b61011461060d565b61015f6101d1366004610f53565b61061c565b61015f6101e4366004610fa5565b61062b565b6101146101f7366004610e9d565b6106aa565b6100f761020a366004611081565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061026957506001600160e01b03198216635b5e139f60e01b145b8061028457506301ffc9a760e01b6001600160e01b03198316145b92915050565b606060658054610299906110b4565b80601f01602080910402602001604051908101604052809291908181526020018280546102c5906110b4565b80156103125780601f106102e757610100808354040283529160200191610312565b820191906000526020600020905b8154815290600101906020018083116102f557829003601f168201915b5050505050905090565b60006103278261071e565b506000908152606960205260409020546001600160a01b031690565b600061034e8261050e565b9050806001600160a01b0316836001600160a01b0316036103c05760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103fa57506001600160a01b0381166000908152606a6020908152604080832033845290915290205460ff165b61046c5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016103b7565b6104768383610785565b505050565b6104853382610800565b6104e85760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b60648201526084016103b7565b61047683838361087f565b6104768383836040518060200160405280600081525061062b565b6000818152606760205260408120546001600160a01b0316806102845760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016103b7565b60006001600160a01b0382166105f15760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e6572000000000000000000000000000000000000000000000060648201526084016103b7565b506001600160a01b031660009081526068602052604090205490565b606060668054610299906110b4565b610627338383610a40565b5050565b6106353383610800565b6106985760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b60648201526084016103b7565b6106a484848484610b0e565b50505050565b60606106b58261071e565b60006106cc60408051602081019091526000815290565b905060008151116106ec5760405180602001604052806000815250610717565b806106f684610b97565b6040516020016107079291906110ee565b6040516020818303038152906040525b9392505050565b6000818152606760205260409020546001600160a01b03166107825760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016103b7565b50565b6000818152606960205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03841690811790915581906107c78261050e565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008061080c8361050e565b9050806001600160a01b0316846001600160a01b0316148061085357506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b806108775750836001600160a01b031661086c8461031c565b6001600160a01b0316145b949350505050565b826001600160a01b03166108928261050e565b6001600160a01b03161461090e5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e657200000000000000000000000000000000000000000000000000000060648201526084016103b7565b6001600160a01b0382166109705760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103b7565b61097b600082610785565b6001600160a01b03831660009081526068602052604081208054600192906109a4908490611133565b90915550506001600160a01b03821660009081526068602052604081208054600192906109d2908490611146565b9091555050600081815260676020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b031603610aa15760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103b7565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610b1984848461087f565b610b2584848484610cb0565b6106a45760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016103b7565b606081600003610bbe5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610be85780610bd281611159565b9150610be19050600a83611188565b9150610bc2565b60008167ffffffffffffffff811115610c0357610c03610f8f565b6040519080825280601f01601f191660200182016040528015610c2d576020820181803683370190505b5090505b841561087757610c42600183611133565b9150610c4f600a8661119c565b610c5a906030611146565b60f81b818381518110610c6f57610c6f6111b0565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350610ca9600a86611188565b9450610c31565b60006001600160a01b0384163b15610dfc57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610cf49033908990889088906004016111c6565b6020604051808303816000875af1925050508015610d2f575060408051601f3d908101601f19168201909252610d2c91810190611202565b60015b610de2573d808015610d5d576040519150601f19603f3d011682016040523d82523d6000602084013e610d62565b606091505b508051600003610dda5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016103b7565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610877565b506001949350505050565b6001600160e01b03198116811461078257600080fd5b600060208284031215610e2f57600080fd5b813561071781610e07565b60005b83811015610e55578181015183820152602001610e3d565b50506000910152565b60008151808452610e76816020860160208601610e3a565b601f01601f19169290920160200192915050565b6020815260006107176020830184610e5e565b600060208284031215610eaf57600080fd5b5035919050565b80356001600160a01b0381168114610ecd57600080fd5b919050565b60008060408385031215610ee557600080fd5b610eee83610eb6565b946020939093013593505050565b600080600060608486031215610f1157600080fd5b610f1a84610eb6565b9250610f2860208501610eb6565b9150604084013590509250925092565b600060208284031215610f4a57600080fd5b61071782610eb6565b60008060408385031215610f6657600080fd5b610f6f83610eb6565b915060208301358015158114610f8457600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610fbb57600080fd5b610fc485610eb6565b9350610fd260208601610eb6565b925060408501359150606085013567ffffffffffffffff80821115610ff657600080fd5b818701915087601f83011261100a57600080fd5b81358181111561101c5761101c610f8f565b604051601f8201601f19908116603f0116810190838211818310171561104457611044610f8f565b816040528281528a602084870101111561105d57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561109457600080fd5b61109d83610eb6565b91506110ab60208401610eb6565b90509250929050565b600181811c908216806110c857607f821691505b6020821081036110e857634e487b7160e01b600052602260045260246000fd5b50919050565b60008351611100818460208801610e3a565b835190830190611114818360208801610e3a565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b818103818111156102845761028461111d565b808201808211156102845761028461111d565b60006001820161116b5761116b61111d565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261119757611197611172565b500490565b6000826111ab576111ab611172565b500690565b634e487b7160e01b600052603260045260246000fd5b60006001600160a01b038087168352808616602084015250836040830152608060608301526111f86080830184610e5e565b9695505050505050565b60006020828403121561121457600080fd5b815161071781610e0756fea164736f6c6343000810000a";

type ERC721UpgradeableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721UpgradeableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721Upgradeable__factory extends ContractFactory {
  constructor(...args: ERC721UpgradeableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721Upgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC721Upgradeable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC721Upgradeable {
    return super.attach(address) as ERC721Upgradeable;
  }
  override connect(signer: Signer): ERC721Upgradeable__factory {
    return super.connect(signer) as ERC721Upgradeable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721UpgradeableInterface {
    return new utils.Interface(_abi) as ERC721UpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721Upgradeable {
    return new Contract(address, _abi, signerOrProvider) as ERC721Upgradeable;
  }
}