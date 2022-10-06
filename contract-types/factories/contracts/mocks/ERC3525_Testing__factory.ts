/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  ERC3525_Testing,
  ERC3525_TestingInterface,
} from "../../../contracts/mocks/ERC3525_Testing";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "AlreadyMinted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "transferAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
    ],
    name: "InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "transferAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
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
    ],
    name: "InvalidApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "InvalidID",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "NonExistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "NotApprovedOrOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
    ],
    name: "SlotsMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "ToZeroAddress",
    type: "error",
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
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "ApprovalValue",
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
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_oldSlot",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_newSlot",
        type: "uint256",
      },
    ],
    name: "SlotChanged",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "TransferValue",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "operator_",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    name: "approveValue",
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
        name: "tokenId_",
        type: "uint256",
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
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractURI",
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
    inputs: [],
    name: "initialize",
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
    inputs: [
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slot_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    name: "mintValue",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "slotByIndex",
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
    inputs: [],
    name: "slotCount",
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
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "slotOf",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "slotURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    name: "spendAllowance",
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
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
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
        name: "_slot",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "tokenInSlotByIndex",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
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
        name: "_slot",
        type: "uint256",
      },
    ],
    name: "tokenSupplyInSlot",
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
        name: "tokenID_",
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
    inputs: [],
    name: "totalSupply",
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
        name: "fromTokenId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "toTokenId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fromTokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "uint256",
        name: "newTokenId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fromTokenId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "toTokenId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "valueDecimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506126fd806100206000396000f3fe6080604052600436106102335760003560e01c8063449d077211610138578063993bef8d116100b0578063c87b56dd1161007f578063e8a3d48511610064578063e8a3d4851461065f578063e985e9c514610674578063ed08fa80146106bd57600080fd5b8063c87b56dd146105f8578063e345e0bc1461061857600080fd5b8063993bef8d146105785780639cc7f70814610598578063a22cb465146105b8578063b88d4fde146105d857600080fd5b806370a08231116101075780638cb0a511116100ec5780638cb0a5111461053057806390dd26271461054357806395d89b411461056357600080fd5b806370a08231146104fb5780638129fc1c1461051b57600080fd5b8063449d07721461046e5780634f6ccce71461048e5780634f8a0f83146104ae5780636352211e146104db57600080fd5b806318160ddd116101cb578063310ed7f01161019a5780633e7e86691161017f5780633e7e86691461041257806342842e0e1461042e57806342966c681461044e57600080fd5b8063310ed7f0146103df57806333d7aa3c146103f257600080fd5b806318160ddd1461036a57806323b872dd1461037f578063263f3e7e1461039f5780632f745c59146103bf57600080fd5b8063081812fc11610207578063081812fc146102df578063095ea7b31461031757806309c3dd87146103375780630f485c021461035757600080fd5b8062cd01101461023857806301ffc9a71461026b5780630468f0de1461029b57806306fdde03146102bd575b600080fd5b34801561024457600080fd5b50610258610253366004612178565b6106d2565b6040519081526020015b60405180910390f35b34801561027757600080fd5b5061028b6102863660046121b0565b610706565b6040519015158152602001610262565b3480156102a757600080fd5b506102bb6102b63660046121e9565b610761565b005b3480156102c957600080fd5b506102d2610771565b604051610262919061226e565b3480156102eb57600080fd5b506102ff6102fa366004612281565b610803565b6040516001600160a01b039091168152602001610262565b34801561032357600080fd5b506102bb61033236600461229a565b61082a565b34801561034357600080fd5b506102d2610352366004612281565b61093f565b6102586103653660046121e9565b6109d6565b34801561037657600080fd5b50609954610258565b34801561038b57600080fd5b506102bb61039a3660046122c4565b610a1e565b3480156103ab57600080fd5b506102586103ba366004612281565b610a96565b3480156103cb57600080fd5b506102586103da36600461229a565b610ae1565b6102bb6103ed3660046122f0565b610b89565b3480156103fe57600080fd5b506102bb61040d36600461231c565b610b9f565b34801561041e57600080fd5b5060405160008152602001610262565b34801561043a57600080fd5b506102bb6104493660046122c4565b610bb1565b34801561045a57600080fd5b506102bb610469366004612281565b610bcc565b34801561047a57600080fd5b506102bb610489366004612355565b610bd8565b34801561049a57600080fd5b506102586104a9366004612281565b610be3565b3480156104ba57600080fd5b506102586104c9366004612281565b600090815260ff602052604090205490565b3480156104e757600080fd5b506102ff6104f6366004612281565b610c87565b34801561050757600080fd5b50610258610516366004612388565b610cec565b34801561052757600080fd5b506102bb610d86565b6102bb61053e3660046121e9565b610e9d565b34801561054f57600080fd5b506102bb61055e3660046122f0565b610b94565b34801561056f57600080fd5b506102d2610f25565b34801561058457600080fd5b50610258610593366004612281565b610f34565b3480156105a457600080fd5b506102586105b3366004612281565b610f49565b3480156105c457600080fd5b506102bb6105d33660046123a3565b610f94565b3480156105e457600080fd5b506102bb6105f33660046123f5565b610fa3565b34801561060457600080fd5b506102d2610613366004612281565b61101c565b34801561062457600080fd5b506102586106333660046124d1565b600082815260fc602090815260408083206001600160a01b038516845260010190915290205492915050565b34801561066b57600080fd5b506102d26110ee565b34801561068057600080fd5b5061028b61068f3660046124fd565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b3480156106c957600080fd5b5060fe54610258565b600082815260ff602052604081208054839081106106f2576106f2612527565b906000526020600020015490505b92915050565b60006001600160e01b031982166370b0048160e11b148061073757506001600160e01b03198216631dba0dcf60e11b145b8061075257506001600160e01b03198216630354d60560e61b145b80610700575061070082611125565b61076c83838361114a565b505050565b6060606580546107809061253d565b80601f01602080910402602001604051908101604052809291908181526020018280546107ac9061253d565b80156107f95780601f106107ce576101008083540402835291602001916107f9565b820191906000526020600020905b8154815290600101906020018083116107dc57829003601f168201915b5050505050905090565b600061080e826111d4565b506000908152606960205260409020546001600160a01b031690565b600061083582610c87565b9050806001600160a01b0316836001600160a01b0316036108a75760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806108c357506108c3813361068f565b6109355760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000606482015260840161089e565b61076c8383611238565b60606040516020016109c0907f646174613a6170706c69636174696f6e2f6a736f6e3b7b6e616d653a536c6f7481527f205479706520412c6465736372697074696f6e3a536c6f74205479706520412060208201527f6465736372697074696f6e7d00000000000000000000000000000000000000006040820152604c0190565b6040516020818303038152906040529050919050565b60006109e33385846112a6565b6109ec84611329565b9050610a0c838260fd60008881526020019081526020016000205461133f565b610a178482846113f9565b9392505050565b610a28338261159f565b610a8b5760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b606482015260840161089e565b61076c83838361161e565b6000818152606760205260408120546001600160a01b0316610ace576040516338077a2b60e01b81526004810183905260240161089e565b50600090815260fd602052604090205490565b6000610aec83610cec565b8210610b605760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e6473000000000000000000000000000000000000000000606482015260840161089e565b506001600160a01b03919091166000908152609760209081526040808320938352929052205490565b610b943384836112a6565b61076c8383836113f9565b610bab848484846117dd565b50505050565b61076c83838360405180602001604052806000815250610fa3565b610bd5816118b1565b50565b61076c838383610bd8565b6000610bee60995490565b8210610c625760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e64730000000000000000000000000000000000000000606482015260840161089e565b60998281548110610c7557610c75612527565b90600052602060002001549050919050565b6000818152606760205260408120546001600160a01b0316806107005760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e2049440000000000000000604482015260640161089e565b60006001600160a01b038216610d6a5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f74206120766160448201527f6c6964206f776e65720000000000000000000000000000000000000000000000606482015260840161089e565b506001600160a01b031660009081526068602052604090205490565b600054610100900460ff1615808015610da65750600054600160ff909116105b80610dc05750303b158015610dc0575060005460ff166001145b610e325760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a6564000000000000000000000000000000000000606482015260840161089e565b6000805460ff191660011790558015610e55576000805461ff0019166101001790555b8015610bd5576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150565b6000610ea884610c87565b9050806001600160a01b0316836001600160a01b031603610ef35760405162ea9f2160e81b8152600481018590523360248201526001600160a01b038416604482015260640161089e565b610efd338561159f565b610f1a5760405163390cdd9b60e21b815260040160405180910390fd5b610bab84848461114a565b6060606680546107809061253d565b600060fe8281548110610c7557610c75612527565b6000818152606760205260408120546001600160a01b0316610f81576040516338077a2b60e01b81526004810183905260240161089e565b50600090815260fb602052604090205490565b610f9f338383611969565b5050565b610fad338361159f565b6110105760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b606482015260840161089e565b610bab84848484611a37565b606061102782610f49565b61103083610a96565b6040516020016109c09291907f646174613a6170706c69636174696f6e2f6a736f6e3b7b6e616d653a4173736581527f74205479706520412c6465736372697074696f6e3a417373657420547970652060208201527f41206465736372697074696f6e2c62616c616e63650000000000000000000000604082015260558101929092527f2c736c6f743a00000000000000000000000000000000000000000000000000006075830152607b820152607d60f81b609b820152609c0190565b60606110f8610771565b611100610f25565b604051602001611111929190612577565b604051602081830303815290604052905090565b60006001600160e01b0319821663780e9d6360e01b1480610700575061070082611ac0565b600083815260fc6020908152604080832080546001808201835582865284862090910180546001600160a01b0319166001600160a01b038916908117909155808652908201845293829020859055905184815290929186917f621b050de0ad08b51d19b48b3e6df75348c4de6bdd93e81b252ca62e28265b1b91015b60405180910390a350505050565b6000818152606760205260409020546001600160a01b0316610bd55760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e2049440000000000000000604482015260640161089e565b600081815260696020526040902080546001600160a01b0319166001600160a01b038416908117909155819061126d82610c87565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600082815260fc602090815260408083206001600160a01b03871684526001019091529020546112d6848461159f565b1580156112e557506000198114155b15610bab57818110156113155760405163054365bb60e31b8152600481018390526024810182905260440161089e565b610bab83856113248585612642565b61114a565b600061133460995490565b610700906001612655565b6113498383611b10565b600082815260fd6020908152604080832084905583835260ff90915281205490036113a45760fe80546001810182556000919091527f54075df80ec1ae6ac9100e1fd0ebf3246c17f5c933137af392011f4c5f61513a018190555b600081815260ff6020908152604080832080546001810182559084529183209091018490555182919084907fe4f48c240d3b994948aa54f3e2f5fca59263dfe1d52b6e4cf39a5d249b5ccb65908390a4505050565b6000838152606760205260409020546001600160a01b0316611431576040516338077a2b60e01b81526004810184905260240161089e565b6000828152606760205260409020546001600160a01b0316611469576040516338077a2b60e01b81526004810183905260240161089e565b600083815260fb602052604090205481106114b257600083815260fb60205260409081902054905163cf47918160e01b815261089e918391600401918252602082015260400190565b600082815260fd602052604080822054858352912054146114f057604051630240901360e61b8152600481018490526024810183905260440161089e565b60006114fb84610c87565b9050600061150884610c87565b600086815260fb602052604081208054929350859290919061152b908490612642565b9091555050600084815260fb60205260408120805485929061154e908490612655565b9091555050600085905260fd60205283857f0b2aac84f3ec956911fd78eae5311062972ff949f38412e8da39069d9f068cc68560405161159091815260200190565b60405180910390a35050505050565b6000806115ab83610c87565b9050806001600160a01b0316846001600160a01b031614806115f257506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b806116165750836001600160a01b031661160b84610803565b6001600160a01b0316145b949350505050565b826001600160a01b031661163182610c87565b6001600160a01b0316146116ad5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e6572000000000000000000000000000000000000000000000000000000606482015260840161089e565b6001600160a01b03821661170f5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161089e565b61171a838383611c5e565b611725600082611238565b6001600160a01b038316600090815260686020526040812080546001929061174e908490612642565b90915550506001600160a01b038216600090815260686020526040812080546001929061177c908490612655565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b03841661180457604051630c63e1ed60e11b815260040160405180910390fd5b826000036118285760405163d338ed0760e01b81526004810184905260240161089e565b6000838152606760205260409020546001600160a01b031615611861576040516314b27b7f60e31b81526004810184905260240161089e565b61186c84848461133f565b600083815260fb602052604090208190558260007f0b2aac84f3ec956911fd78eae5311062972ff949f38412e8da39069d9f068cc6836040516111c691815260200190565b60006118bc82610c87565b600083815260fd602090815260408083205460fb90925290912054919250906118e484611d00565b600084815260fd6020908152604080832083905560fb82528083208390555183815286917f0b2aac84f3ec956911fd78eae5311062972ff949f38412e8da39069d9f068cc6910160405180910390a3600082857fe4f48c240d3b994948aa54f3e2f5fca59263dfe1d52b6e4cf39a5d249b5ccb6560405160405180910390a450505050565b816001600160a01b0316836001600160a01b0316036119ca5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161089e565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611a4284848461161e565b611a4e84848484611da7565b610bab5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161089e565b60006001600160e01b031982166380ac58cd60e01b1480611af157506001600160e01b03198216635b5e139f60e01b145b8061070057506301ffc9a760e01b6001600160e01b0319831614610700565b6001600160a01b038216611b665760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161089e565b6000818152606760205260409020546001600160a01b031615611bcb5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161089e565b611bd760008383611c5e565b6001600160a01b0382166000908152606860205260408120805460019290611c00908490612655565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b611c69838383611efe565b600081815260fc6020526040812054905b81811015611ce857600083815260fc60205260408120805483908110611ca257611ca2612527565b600091825260208083209091015486835260fc825260408084206001600160a01b0390921684526001919091019091528120555080611ce081612668565b915050611c7a565b50600082815260fc60205260408120610bab91612146565b6000611d0b82610c87565b9050611d1981600084611c5e565b611d24600083611238565b6001600160a01b0381166000908152606860205260408120805460019290611d4d908490612642565b909155505060008281526067602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60006001600160a01b0384163b15611ef357604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611deb903390899088908890600401612681565b6020604051808303816000875af1925050508015611e26575060408051601f3d908101601f19168201909252611e23918101906126bd565b60015b611ed9573d808015611e54576040519150601f19603f3d011682016040523d82523d6000602084013e611e59565b606091505b508051600003611ed15760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161089e565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611616565b506001949350505050565b6001600160a01b038316611f5957611f5481609980546000838152609a60205260408120829055600182018355919091527f72a152ddfb8e864297c917af52ea6c1c68aead0fee1a62673fcc7e0c94979d000155565b611f7c565b816001600160a01b0316836001600160a01b031614611f7c57611f7c8382611fb6565b6001600160a01b038216611f935761076c81612053565b826001600160a01b0316826001600160a01b03161461076c5761076c8282612102565b60006001611fc384610cec565b611fcd9190612642565b600083815260986020526040902054909150808214612020576001600160a01b03841660009081526097602090815260408083208584528252808320548484528184208190558352609890915290208190555b5060009182526098602090815260408084208490556001600160a01b039094168352609781528383209183525290812055565b60995460009061206590600190612642565b6000838152609a60205260408120546099805493945090928490811061208d5761208d612527565b9060005260206000200154905080609983815481106120ae576120ae612527565b6000918252602080832090910192909255828152609a909152604080822084905585825281205560998054806120e6576120e66126da565b6001900381819060005260206000200160009055905550505050565b600061210d83610cec565b6001600160a01b039093166000908152609760209081526040808320868452825280832085905593825260989052919091209190915550565b5080546000825590600052602060002090810190610bd591905b808211156121745760008155600101612160565b5090565b6000806040838503121561218b57600080fd5b50508035926020909101359150565b6001600160e01b031981168114610bd557600080fd5b6000602082840312156121c257600080fd5b8135610a178161219a565b80356001600160a01b03811681146121e457600080fd5b919050565b6000806000606084860312156121fe57600080fd5b8335925061220e602085016121cd565b9150604084013590509250925092565b60005b83811015612239578181015183820152602001612221565b50506000910152565b6000815180845261225a81602086016020860161221e565b601f01601f19169290920160200192915050565b602081526000610a176020830184612242565b60006020828403121561229357600080fd5b5035919050565b600080604083850312156122ad57600080fd5b6122b6836121cd565b946020939093013593505050565b6000806000606084860312156122d957600080fd5b6122e2846121cd565b925061220e602085016121cd565b60008060006060848603121561230557600080fd5b505081359360208301359350604090920135919050565b6000806000806080858703121561233257600080fd5b61233b856121cd565b966020860135965060408601359560600135945092505050565b60008060006060848603121561236a57600080fd5b612373846121cd565b95602085013595506040909401359392505050565b60006020828403121561239a57600080fd5b610a17826121cd565b600080604083850312156123b657600080fd5b6123bf836121cd565b9150602083013580151581146123d457600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b6000806000806080858703121561240b57600080fd5b612414856121cd565b9350612422602086016121cd565b925060408501359150606085013567ffffffffffffffff8082111561244657600080fd5b818701915087601f83011261245a57600080fd5b81358181111561246c5761246c6123df565b604051601f8201601f19908116603f01168101908382118183101715612494576124946123df565b816040528281528a60208487010111156124ad57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b600080604083850312156124e457600080fd5b823591506124f4602084016121cd565b90509250929050565b6000806040838503121561251057600080fd5b612519836121cd565b91506124f4602084016121cd565b634e487b7160e01b600052603260045260246000fd5b600181811c9082168061255157607f821691505b60208210810361257157634e487b7160e01b600052602260045260246000fd5b50919050565b7f646174613a6170706c69636174696f6e2f6a736f6e3b7b00000000000000000081527f226e616d65223a000000000000000000000000000000000000000000000000006017820152600083516125d581601e85016020880161221e565b7f2c2273796d626f6c223a00000000000000000000000000000000000000000000601e91840191820152835161261281602884016020880161221e565b607d60f81b60289290910191820152602901949350505050565b634e487b7160e01b600052601160045260246000fd5b818103818111156107005761070061262c565b808201808211156107005761070061262c565b60006001820161267a5761267a61262c565b5060010190565b60006001600160a01b038087168352808616602084015250836040830152608060608301526126b36080830184612242565b9695505050505050565b6000602082840312156126cf57600080fd5b8151610a178161219a565b634e487b7160e01b600052603160045260246000fdfea164736f6c6343000810000a";

type ERC3525_TestingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC3525_TestingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC3525_Testing__factory extends ContractFactory {
  constructor(...args: ERC3525_TestingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC3525_Testing> {
    return super.deploy(overrides || {}) as Promise<ERC3525_Testing>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC3525_Testing {
    return super.attach(address) as ERC3525_Testing;
  }
  override connect(signer: Signer): ERC3525_Testing__factory {
    return super.connect(signer) as ERC3525_Testing__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC3525_TestingInterface {
    return new utils.Interface(_abi) as ERC3525_TestingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC3525_Testing {
    return new Contract(address, _abi, signerOrProvider) as ERC3525_Testing;
  }
}