/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  HyperCertMetadata,
  HyperCertMetadataInterface,
} from "../../../contracts/HypercertMetadata.sol/HyperCertMetadata";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UPGRADER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "generateContractURI",
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
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    inputs: [
      {
        internalType: "address",
        name: "svgGenerationAddress",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
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
    name: "updateVersion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
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
];

const _bytecode =
  "0x60a0604052306080523480156200001557600080fd5b506200002062000026565b620000e8565b600054610100900460ff1615620000935760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff9081161015620000e6576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b60805161381f6200012060003960008181610445015281816104ca01528181610621015281816106a6015261078c015261381f6000f3fe60806040526004361061010e5760003560e01c806354fd4d50116100a5578063a217fddf11610074578063d547741f11610059578063d547741f146102fb578063ed03f41a1461031b578063f72c0d8b1461033b57600080fd5b8063a217fddf146102c6578063c4d66de8146102db57600080fd5b806354fd4d501461022557806391383c891461023e57806391d148541461026b5780639f4475da146102b157600080fd5b80633659cfe6116100e15780633659cfe6146101c857806348c02dc1146101e85780634f1ef286146101fd57806352d1902d1461021057600080fd5b806301ffc9a714610113578063248a9ca3146101485780632f2ff15d1461018657806336568abe146101a8575b600080fd5b34801561011f57600080fd5b5061013361012e366004612254565b61036f565b60405190151581526020015b60405180910390f35b34801561015457600080fd5b5061017861016336600461227e565b60009081526065602052604090206001015490565b60405190815260200161013f565b34801561019257600080fd5b506101a66101a13660046122ac565b610380565b005b3480156101b457600080fd5b506101a66101c33660046122ac565b6103aa565b3480156101d457600080fd5b506101a66101e33660046122dc565b61043b565b3480156101f457600080fd5b506101a66105b6565b6101a661020b366004612392565b610617565b34801561021c57600080fd5b5061017861077f565b34801561023157600080fd5b5060fb5461ffff16610178565b34801561024a57600080fd5b5061025e61025936600461227e565b610844565b60405161013f9190612475565b34801561027757600080fd5b506101336102863660046122ac565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b3480156102bd57600080fd5b5061025e6109d4565b3480156102d257600080fd5b50610178600081565b3480156102e757600080fd5b506101a66102f63660046122dc565b610a0c565b34801561030757600080fd5b506101a66103163660046122ac565b610ba1565b34801561032757600080fd5b5061025e610336366004612488565b610bc6565b34801561034757600080fd5b506101787f189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e381565b600061037a82610d97565b92915050565b60008281526065602052604090206001015461039b81610dcc565b6103a58383610dd6565b505050565b6001600160a01b038116331461042d5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084015b60405180910390fd5b6104378282610e78565b5050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036104c85760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201526b19195b1959d85d1958d85b1b60a21b6064820152608401610424565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166105237f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b6001600160a01b03161461058e5760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201526b6163746976652070726f787960a01b6064820152608401610424565b61059781610efb565b604080516000808252602082019092526105b391839190610f25565b50565b7f189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e36105e081610dcc565b60fb8054600191906000906105fa90849061ffff166124c0565b92506101000a81548161ffff021916908361ffff16021790555050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036106a45760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201526b19195b1959d85d1958d85b1b60a21b6064820152608401610424565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166106ff7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b6001600160a01b03161461076a5760405162461bcd60e51b815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201526b6163746976652070726f787960a01b6064820152608401610424565b61077382610efb565b61043782826001610f25565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461081f5760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610424565b507f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc90565b6040516372927aa360e01b81526004810182905260609060009033906372927aa390602401600060405180830381865afa158015610886573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108ae91908101906126bc565b905060006108bf82608001516110c5565b90506109ac8261014001518361016001516108da85856111f2565b85610180015161095b6040518060400160405280600b81526020017f546f74616c20756e6974730000000000000000000000000000000000000000008152506040518060400160405280601781526020017f556e6974732068656c64206279206672616374696f6e2e0000000000000000008152508960e0015160006112b8565b60405160200161096b9190612886565b604051602081830303815290604052610983886112fc565b604051602001610998969594939291906128d6565b604051602081830303815290604052611633565b6040516020016109bc9190612a13565b60405160208183030381529060405292505050919050565b60606109e860405160200161099890612a58565b6040516020016109f89190612a13565b604051602081830303815290604052905090565b600054610100900460ff1615808015610a2c5750600054600160ff909116105b80610a465750303b158015610a46575060005460ff166001145b610ab85760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152608401610424565b6000805460ff191660011790558015610adb576000805461ff0019166101001790555b60fb80547fffffffffffffffffffff0000000000000000000000000000000000000000ffff16620100006001600160a01b03851602179055610b1b611786565b610b23611786565b610b2e600033610dd6565b610b587f189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e333610dd6565b8015610437576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b600082815260656020526040902060010154610bbc81610dcc565b6103a58383610e78565b6040516372927aa360e01b81526004810183905260609060009033906372927aa390602401600060405180830381865afa158015610c08573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610c3091908101906126bc565b604051631398fee160e31b8152600481018590529091506000903390639cc7f70890602401602060405180830381865afa158015610c72573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c969190612c5e565b90506000610ca783608001516110c5565b9050610d6d836101400151846101600151610cc3868686611805565b866101800151610d456040518060400160405280600881526020017f4672616374696f6e0000000000000000000000000000000000000000000000008152506040518060400160405280601781526020017f556e6974732068656c64206279206672616374696f6e2e000000000000000000815250898b60e001516000611884565b604051602001610d559190612c77565b604051602081830303815290604052610983896112fc565b604051602001610d7d9190612a13565b604051602081830303815290604052935050505092915050565b60006001600160e01b03198216637965db0b60e01b148061037a57506301ffc9a760e01b6001600160e01b031983161461037a565b6105b381336118d3565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff166104375760008281526065602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610e343390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff16156104375760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b7f189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e361043781610dcc565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff1615610f58576103a583611953565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610fb2575060408051601f3d908101601f19168201909252610faf91810190612c5e565b60015b6110245760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f7420555550530000000000000000000000000000000000006064820152608401610424565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc81146110b95760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c655555494400000000000000000000000000000000000000000000006064820152608401610424565b506103a5838383611a29565b805160609080156111ec5760008167ffffffffffffffff8111156110eb576110eb6122f9565b60405190808252806020026020018201604052801561111e57816020015b60608152602001906001900390816111095790505b50905060005b828110156111e857336001600160a01b031663ef6f66d786838151811061114d5761114d612cc7565b60200260200101516040518263ffffffff1660e01b815260040161117391815260200190565b600060405180830381865afa158015611190573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526111b89190810190612cdd565b8282815181106111ca576111ca612cc7565b602002602001018190525080806111e090612d12565b915050611124565b5091505b50919050565b60fb54610140830151602084015160408086015160e087015191516312945dd760e31b815260609561129195620100009091046001600160a01b0316946394a2eeb8946112479492938a939190600401612dad565b600060405180830381865afa158015611264573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261128c9190810190612cdd565b611633565b6040516020016112a19190612dff565b604051602081830303815290604052905092915050565b606084846112c585611a54565b6112d0851515611b5d565b6040516020016112e39493929190612e44565b6040516020818303038152906040529050949350505050565b60606113626040518060400160405280600781526020017f536c6f74204944000000000000000000000000000000000000000000000000008152506040518060600160405280602b815260200161369e602b9139845161135b90611a54565b6000611bbe565b6040516020016113729190612f1f565b6040516020818303038152906040526113ef6040518060400160405280600e81526020017f53636f706573206f6620576f726b0000000000000000000000000000000000008152506040518060600160405280603781526020016136c9603791396113e86113e38760600151611be1565b611d04565b6001611d9b565b6040516020016113ff9190612f6f565b6040516020818303038152906040526114706040518060400160405280601081526020017f53636f706573206f6620496d7061637400000000000000000000000000000000815250604051806060016040528060398152602001613740603991396113e86113e388608001516110c5565b6040516020016114809190612fbf565b6040516020818303038152906040526114ed6040518060400160405280601181526020017f54696d656672616d65206f6620776f726b0000000000000000000000000000008152506040518060600160405280603c81526020016137d7603c913987602001516001611dbe565b6040516020016114fd919061300f565b60405160208183030381529060405261156a6040518060400160405280601381526020017f54696d656672616d65206f6620696d70616374000000000000000000000000008152506040518060600160405280602581526020016136796025913988604001516001611dbe565b60405160200161157a9190613047565b6040516020818303038152906040526115eb6040518060400160405280600681526020017f52696768747300000000000000000000000000000000000000000000000000008152506040518060600160405280603781526020016137a0603791396113e86113e38b60a00151611dcb565b6040516020016115fb919061307f565b60408051601f198184030181529082905261161d9695949392916020016130c4565b6040516020818303038152906040529050919050565b6060815160000361165257505060408051602081019091526000815290565b600060405180606001604052806040815260200161370060409139905060006003845160026116819190613143565b61168b919061316c565b611696906004613180565b67ffffffffffffffff8111156116ae576116ae6122f9565b6040519080825280601f01601f1916602001820160405280156116d8576020820181803683370190505b509050600182016020820185865187015b80821015611744576003820191508151603f8160121c168501518453600184019350603f81600c1c168501518453600184019350603f8160061c168501518453600184019350603f81168501518453506001830192506116e9565b505060038651066001811461176057600281146117735761177b565b603d6001830353603d600283035361177b565b603d60018303535b509195945050505050565b600054610100900460ff166118035760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e670000000000000000000000000000000000000000006064820152608401610424565b565b60fb54610140840151602085015160408087015160e08801519151634560ed3960e11b815260609561185b95620100009091046001600160a01b031694638ac1da72946112479492938a93918c9160040161319f565b60405160200161186b9190612dff565b60405160208183030381529060405290505b9392505050565b6060858561189186611a54565b61189a86611a54565b6118a5861515611b5d565b6040516020016118b99594939291906131f8565b604051602081830303815290604052905095945050505050565b60008281526065602090815260408083206001600160a01b038516845290915290205460ff1661043757611911816001600160a01b03166014611eee565b61191c836020611eee565b60405160200161192d929190613318565b60408051601f198184030181529082905262461bcd60e51b825261042491600401612475565b6001600160a01b0381163b6119d05760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e7472616374000000000000000000000000000000000000006064820152608401610424565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b611a3283612097565b600082511180611a3f5750805b156103a557611a4e83836120d7565b50505050565b606081600003611a7b5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115611aa55780611a8f81612d12565b9150611a9e9050600a8361316c565b9150611a7f565b60008167ffffffffffffffff811115611ac057611ac06122f9565b6040519080825280601f01601f191660200182016040528015611aea576020820181803683370190505b5090505b8415611b5557611aff600183613399565b9150611b0c600a866133ac565b611b17906030613143565b60f81b818381518110611b2c57611b2c612cc7565b60200101906001600160f81b031916908160001a905350611b4e600a8661316c565b9450611aee565b949350505050565b60608115611b855750506040805180820190915260048152637472756560e01b602082015290565b505060408051808201909152600581527f66616c7365000000000000000000000000000000000000000000000000000000602082015290565b6060848484611bce851515611b5d565b6040516020016112e394939291906133c0565b805160609080156111ec5760008167ffffffffffffffff811115611c0757611c076122f9565b604051908082528060200260200182016040528015611c3a57816020015b6060815260200190600190039081611c255790505b50905060005b828110156111e857336001600160a01b0316638f88b767868381518110611c6957611c69612cc7565b60200260200101516040518263ffffffff1660e01b8152600401611c8f91815260200190565b600060405180830381865afa158015611cac573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611cd49190810190612cdd565b828281518110611ce657611ce6612cc7565b60200260200101819052508080611cfc90612d12565b915050611c40565b80516060908160005b828110156111e8576000858281518110611d2957611d29612cc7565b6020026020010151604051602001611d4191906134ae565b60405160208183030381529060405290508251600003611d6357809250611d88565b8281604051602001611d769291906134dc565b60405160208183030381529060405292505b5080611d9381612d12565b915050611d0d565b6060848484611dab851515611b5d565b6040516020016112e39493929190613518565b606084846112c5856121e2565b805160609080156111ec5760008167ffffffffffffffff811115611df157611df16122f9565b604051908082528060200260200182016040528015611e2457816020015b6060815260200190600190039081611e0f5790505b50905060005b828110156111e857336001600160a01b031663d52fd095868381518110611e5357611e53612cc7565b60200260200101516040518263ffffffff1660e01b8152600401611e7991815260200190565b600060405180830381865afa158015611e96573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611ebe9190810190612cdd565b828281518110611ed057611ed0612cc7565b60200260200101819052508080611ee690612d12565b915050611e2a565b60606000611efd836002613180565b611f08906002613143565b67ffffffffffffffff811115611f2057611f206122f9565b6040519080825280601f01601f191660200182016040528015611f4a576020820181803683370190505b509050600360fc1b81600081518110611f6557611f65612cc7565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611f9457611f94612cc7565b60200101906001600160f81b031916908160001a9053506000611fb8846002613180565b611fc3906001613143565b90505b6001811115612048577f303132333435363738396162636465660000000000000000000000000000000085600f166010811061200457612004612cc7565b1a60f81b82828151811061201a5761201a612cc7565b60200101906001600160f81b031916908160001a90535060049490941c93612041816135e9565b9050611fc6565b50831561187d5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610424565b6120a081611953565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b6121565760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f60448201527f6e747261637400000000000000000000000000000000000000000000000000006064820152608401610424565b600080846001600160a01b0316846040516121719190613600565b600060405180830381855af49150503d80600081146121ac576040519150601f19603f3d011682016040523d82523d6000602084013e6121b1565b606091505b50915091506121d982826040518060600160405280602781526020016137796027913961221b565b95945050505050565b60606121ff8260005b602002015167ffffffffffffffff16611a54565b61220a8360016121eb565b60405160200161161d92919061361c565b6060831561222a57508161187d565b82511561223a5782518084602001fd5b8160405162461bcd60e51b81526004016104249190612475565b60006020828403121561226657600080fd5b81356001600160e01b03198116811461187d57600080fd5b60006020828403121561229057600080fd5b5035919050565b6001600160a01b03811681146105b357600080fd5b600080604083850312156122bf57600080fd5b8235915060208301356122d181612297565b809150509250929050565b6000602082840312156122ee57600080fd5b813561187d81612297565b634e487b7160e01b600052604160045260246000fd5b6040516101a0810167ffffffffffffffff81118282101715612333576123336122f9565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715612362576123626122f9565b604052919050565b600067ffffffffffffffff821115612384576123846122f9565b50601f01601f191660200190565b600080604083850312156123a557600080fd5b82356123b081612297565b9150602083013567ffffffffffffffff8111156123cc57600080fd5b8301601f810185136123dd57600080fd5b80356123f06123eb8261236a565b612339565b81815286602083850101111561240557600080fd5b816020840160208301376000602083830101528093505050509250929050565b60005b83811015612440578181015183820152602001612428565b50506000910152565b60008151808452612461816020860160208601612425565b601f01601f19169290920160200192915050565b60208152600061187d6020830184612449565b6000806040838503121561249b57600080fd5b50508035926020909101359150565b634e487b7160e01b600052601160045260246000fd5b61ffff8181168382160190808211156124db576124db6124aa565b5092915050565b600082601f8301126124f357600080fd5b6040516040810167ffffffffffffffff8282108183111715612517576125176122f9565b6040918252829185018681111561252d57600080fd5b855b8181101561255657805183811681146125485760008081fd5b84526020938401930161252f565b50929695505050505050565b600067ffffffffffffffff82111561257c5761257c6122f9565b5060051b60200190565b600082601f83011261259757600080fd5b815160206125a76123eb83612562565b82815260059290921b840181019181810190868411156125c657600080fd5b8286015b848110156125e157805183529183019183016125ca565b509695505050505050565b600082601f8301126125fd57600080fd5b8151602061260d6123eb83612562565b82815260059290921b8401810191818101908684111561262c57600080fd5b8286015b848110156125e157805161264381612297565b8352918301918301612630565b805161ffff8116811461266257600080fd5b919050565b8051801515811461266257600080fd5b600082601f83011261268857600080fd5b81516126966123eb8261236a565b8181528460208386010111156126ab57600080fd5b611b55826020830160208701612425565b6000602082840312156126ce57600080fd5b815167ffffffffffffffff808211156126e657600080fd5b908301906101e082860312156126fb57600080fd5b61270361230f565b8251815261271486602085016124e2565b602082015261272686606085016124e2565b604082015260a08301518281111561273d57600080fd5b61274987828601612586565b60608301525060c08301518281111561276157600080fd5b61276d87828601612586565b60808301525060e08301518281111561278557600080fd5b61279187828601612586565b60a08301525061010080840151838111156127ab57600080fd5b6127b7888287016125ec565b60c0840152506101208085015160e08401526101406127d7818701612650565b8385015261016092506127eb838701612667565b828501526101809150818601518581111561280557600080fd5b6128118a828901612677565b8286015250506101a08501518481111561282a57600080fd5b61283689828801612677565b83850152506101c085015191508382111561285057600080fd5b61285c88838701612677565b908301525095945050505050565b6000815161287c818560208601612425565b9290920192915050565b7f22746f74616c556e697473223a000000000000000000000000000000000000008152600082516128be81600d850160208701612425565b600b60fa1b600d939091019283015250600e01919050565b683d913730b6b2911d1160b91b8152600087516128fa816009850160208c01612425565b701116113232b9b1b934b83a34b7b7111d1160791b600991840191820152875161292b81601a840160208c01612425565b7f222c22696d616765223a22000000000000000000000000000000000000000000601a92909101918201528651612969816025840160208b01612425565b7f222c2265787465726e616c5f75726c223a2200000000000000000000000000006025929091019182015285516129a7816037840160208a01612425565b7f222c2270726f70657274696573223a7b000000000000000000000000000000006037929091019182015284516129e5816047840160208901612425565b612a056129f76047838501018761286a565b617d7d60f01b815260020190565b9a9950505050505050505050565b7f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c000000815260008251612a4b81601d850160208701612425565b91909101601d0192915050565b7f7b226e616d65223a22487970657243657274732200000000000000000000000081527f222c226465736372697074696f6e223a2248797065724365727473206372656160148201527f746520616e20696e7465726f70657261626c652064617461206c61796572207460348201527f6f206163636f756e7420666f7220616374696f6e73207468617420617265206560548201527f7870656374656420746f206861766520706f73697469766520696d706163742e60748201527f205468657920617265206120746f6f6c20746f206275696c64207363616c616260948201527f6c65207265776172642073797374656d7320666f7220696d706163742e22000060b48201527f222c22696d616765223a2268747470733a2f2f6261666b726569666a6770657760d28201527f7a35366c766464796175377873626165666d33717563336b346d6b3334636f6b60f28201527f716b6c32687875796968756e37712e697066732e6e667473746f726167652e6c6101128201527f696e6b2f220000000000000000000000000000000000000000000000000000006101328201527f2c2265787465726e616c5f75726c223a2268747470733a2f2f7777772e6879706101378201527f657263657274732e78797a220000000000000000000000000000000000000000610157820152607d60f81b6101638201526000610164820161037a565b600060208284031215612c7057600080fd5b5051919050565b7f226672616374696f6e223a000000000000000000000000000000000000000000815260008251612caf81600b850160208701612425565b600b60fa1b600b939091019283015250600c01919050565b634e487b7160e01b600052603260045260246000fd5b600060208284031215612cef57600080fd5b815167ffffffffffffffff811115612d0657600080fd5b611b5584828501612677565b600060018201612d2457612d246124aa565b5060010190565b600081518084526020808501808196508360051b8101915082860160005b85811015612d73578284038952612d61848351612449565b98850198935090840190600101612d49565b5091979650505050505050565b8060005b6002811015611a4e57815167ffffffffffffffff16845260209384019390910190600101612d84565b60e081526000612dc060e0830188612449565b8281036020840152612dd28188612d2b565b915050612de26040830186612d80565b612def6080830185612d80565b8260c08301529695505050505050565b7f646174613a696d6167652f7376672b786d6c3b6261736536342c000000000000815260008251612e3781601a850160208701612425565b91909101601a0192915050565b683d913730b6b2911d1160b91b815260008551612e68816009850160208a01612425565b701116113232b9b1b934b83a34b7b7111d1160791b6009918401918201528551612e9981601a840160208a01612425565b691116113b30b63ab2911d60b11b601a92909101918201528451612ec4816024840160208901612425565b7f2c2269735f696e7472696e736963223a22000000000000000000000000000000602492909101918201528351612f02816035840160208801612425565b61227d60f01b603592909101918201526037019695505050505050565b7f22736c6f744944223a0000000000000000000000000000000000000000000000815260008251612f57816009850160208701612425565b600b60fa1b6009939091019283015250600a01919050565b7f2273636f7065734f66576f726b223a0000000000000000000000000000000000815260008251612fa781600f850160208701612425565b600b60fa1b600f939091019283015250601001919050565b7f2273636f7065734f66496d70616374223a000000000000000000000000000000815260008251612ff7816011850160208701612425565b600b60fa1b6011939091019283015250601201919050565b7f2274696d654f66576f726b223a000000000000000000000000000000000000008152600082516128be81600d850160208701612425565b7f2274696d654f66496d70616374223a0000000000000000000000000000000000815260008251612fa781600f850160208701612425565b7f22726967687473223a00000000000000000000000000000000000000000000008152600082516130b7816009850160208701612425565b9190910160090192915050565b6000875160206130d78285838d01612425565b8851918401916130ea8184848d01612425565b88519201916130fc8184848c01612425565b875192019161310e8184848b01612425565b86519201916131208184848a01612425565b85519201916131328184848901612425565b919091019998505050505050505050565b8082018082111561037a5761037a6124aa565b634e487b7160e01b600052601260045260246000fd5b60008261317b5761317b613156565b500490565b600081600019048311821515161561319a5761319a6124aa565b500290565b60006101008083526131b38184018a612449565b905082810360208401526131c78189612d2b565b9150506131d76040830187612d80565b6131e46080830186612d80565b60c082019390935260e00152949350505050565b683d913730b6b2911d1160b91b81526000865161321c816009850160208b01612425565b701116113232b9b1b934b83a34b7b7111d1160791b600991840191820152865161324d81601a840160208b01612425565b691116113b30b63ab2911d60b11b601a92909101918201528551613278816024840160208a01612425565b7f2c226d61785f76616c7565223a000000000000000000000000000000000000006024929091019182015284516132b6816031840160208901612425565b7f2c2269735f696e7472696e736963223a220000000000000000000000000000006031929091019182015283516132f4816042840160208801612425565b61330b60428284010161227d60f01b815260020190565b9998505050505050505050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613350816017850160208801612425565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000601791840191820152835161338d816028840160208801612425565b01602801949350505050565b8181038181111561037a5761037a6124aa565b6000826133bb576133bb613156565b500690565b683d913730b6b2911d1160b91b8152600085516133e4816009850160208a01612425565b701116113232b9b1b934b83a34b7b7111d1160791b600991840191820152855161341581601a840160208a01612425565b7f222c2276616c7565223a22000000000000000000000000000000000000000000601a92909101918201528451613453816025840160208901612425565b7f222c2269735f696e7472696e736963223a220000000000000000000000000000602592909101918201528351613491816037840160208801612425565b61227d60f01b603792909101918201526039019695505050505050565b6000601160f91b80835283516134cb816001860160208801612425565b600193019283015250600201919050565b600083516134ee818460208801612425565b600b60fa1b908301908152835161350c816001840160208801612425565b01600101949350505050565b683d913730b6b2911d1160b91b81526000855161353c816009850160208a01612425565b701116113232b9b1b934b83a34b7b7111d1160791b600991840191820152855161356d81601a840160208a01612425565b7f222c2276616c7565223a5b000000000000000000000000000000000000000000601a929091019182015284516135ab816025840160208901612425565b7f5d2c2269735f696e7472696e736963223a220000000000000000000000000000602592909101918201528351613491816037840160208801612425565b6000816135f8576135f86124aa565b506000190190565b60008251613612818460208701612425565b9190910192915050565b612d9160f11b8152825160009061363a816002850160208801612425565b6211161160e91b600291840191820152835161365d816005840160208801612425565b61225d60f01b6005929091019182015260070194935050505056fe54696d656672616d6520696e20776869636820696d70616374206973207265616c697a6564556e69717565206964656e746966696572206f662048797065724365727420696e20636f6e74726163742e53636f706573206f6620776f726b20656e63617073756c6174656420696e207468697320687970657263657274206672616374696f6e2e4142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2f53636f706573206f6620696d7061637420656e63617073756c6174656420696e207468697320687970657263657274206672616374696f6e2e416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564526967687473206173736f6369617465642077697468206f776e696e67207468652068797065726365727420286672616374696f6e732954696d656672616d6520696e20776869636820776f726b20746f206163686965766520696d7061637420686173206265656e20706572666f726d6564a164736f6c6343000810000a";

type HyperCertMetadataConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HyperCertMetadataConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HyperCertMetadata__factory extends ContractFactory {
  constructor(...args: HyperCertMetadataConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<HyperCertMetadata> {
    return super.deploy(overrides || {}) as Promise<HyperCertMetadata>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): HyperCertMetadata {
    return super.attach(address) as HyperCertMetadata;
  }
  override connect(signer: Signer): HyperCertMetadata__factory {
    return super.connect(signer) as HyperCertMetadata__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HyperCertMetadataInterface {
    return new utils.Interface(_abi) as HyperCertMetadataInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HyperCertMetadata {
    return new Contract(address, _abi, signerOrProvider) as HyperCertMetadata;
  }
}