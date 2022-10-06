/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  HypercertMetadata,
  HypercertMetadataInterface,
} from "../../../contracts/HypercertMetadata.sol/HypercertMetadata";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

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

const _bytecode =
  "0x608060405234801561001057600080fd5b506119b4806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806391383c891461003b578063ed03f41a14610064575b600080fd5b61004e610049366004610bbb565b610077565b60405161005b9190610bf8565b60405180910390f35b61004e610072366004610c2b565b610121565b6040516372927aa360e01b81526004810182905260609060009033906372927aa390602401600060405180830381865afa1580156100b9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526100e19190810190610ec9565b90508061014001518161016001516100f8836101d8565b60405160200161010a93929190611093565b604051602081830303815290604052915050919050565b6040516372927aa360e01b81526004810183905260609060009033906372927aa390602401600060405180830381865afa158015610163573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261018b9190810190610ec9565b90508061014001518161016001516101a2836101d8565b6101ac84876103a6565b6040516020016101bf9493929190611149565b6040516020818303038152906040529150505b92915050565b60606102386040518060400160405280600e81526020017f776f726b5f74696d656672616d65000000000000000000000000000000000000815250604051806060016040528060408152602001611968604091398460200151600161051c565b6102458360600151610560565b6102a36040518060400160405280601081526020017f696d706163745f74696d656672616d6500000000000000000000000000000000815250604051806080016040528060428152602001611926604291398660400151600161051c565b6102b085608001516106b2565b6102bd8660a001516107ec565b61031b6040518060400160405280600b81526020017f746f74616c5f756e6974730000000000000000000000000000000000000000008152506040518060600160405280603481526020016118c6603491398960e001516000610926565b61037a6040518060400160405280600d81526020017f65787465726e616c5f6c696e6b000000000000000000000000000000000000008152506040518060600160405280602c81526020016118fa602c91398a61018001516000610951565b6040516020016103909796959493929190611222565b6040516020818303038152906040529050919050565b604051631398fee160e31b8152600481018290526060906000903390639cc7f70890602401602060405180830381865afa1580156103e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040c91906112ed565b90506104856040518060400160405280600581526020017f756e6974730000000000000000000000000000000000000000000000000000008152506040518060400160405280601b81526020017f556e6974732069737375656420746f207468697320746f6b656e2e0000000000815250836000610926565b61050b6040518060400160405280600881526020017f6672616374696f6e0000000000000000000000000000000000000000000000008152506040518060400160405280601e81526020017f4672616374696f6e2069737375656420746f207468697320746f6b656e2e00008152508760e00151856105049190611332565b6000610926565b6040516020016101bf929190611346565b6060848461052985610961565b61053485151561099a565b6040516020016105479493929190611382565b6040516020818303038152906040529050949350505050565b805160609060008167ffffffffffffffff81111561058057610580610c4d565b6040519080825280602002602001820160405280156105b357816020015b606081526020019060019003908161059e5790505b50905060005b8281101561067d57336001600160a01b0316638f88b7678683815181106105e2576105e2611470565b60200260200101516040518263ffffffff1660e01b815260040161060891815260200190565b600060405180830381865afa158015610625573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261064d9190810190611486565b82828151811061065f5761065f611470565b60200260200101819052508080610675906114bb565b9150506105b9565b50610687816109fb565b600160405160200161069a9291906114d4565b60405160208183030381529060405292505050919050565b805160609060008167ffffffffffffffff8111156106d2576106d2610c4d565b60405190808252806020026020018201604052801561070557816020015b60608152602001906001900390816106f05790505b50905060005b828110156107cf57336001600160a01b031663ef6f66d786838151811061073457610734611470565b60200260200101516040518263ffffffff1660e01b815260040161075a91815260200190565b600060405180830381865afa158015610777573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261079f9190810190611486565b8282815181106107b1576107b1611470565b602002602001018190525080806107c7906114bb565b91505061070b565b506107d9816109fb565b600160405160200161069a929190611596565b805160609060008167ffffffffffffffff81111561080c5761080c610c4d565b60405190808252806020026020018201604052801561083f57816020015b606081526020019060019003908161082a5790505b50905060005b8281101561090957336001600160a01b031663d52fd09586838151811061086e5761086e611470565b60200260200101516040518263ffffffff1660e01b815260040161089491815260200190565b600060405180830381865afa1580156108b1573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108d99190810190611486565b8282815181106108eb576108eb611470565b60200260200101819052508080610901906114bb565b915050610845565b50610913816109fb565b600160405160200161069a929190611658565b6060848461093385610a9a565b61093e85151561099a565b6040516020016105479493929190611724565b606084848461053485151561099a565b606061097e8260005b602002015167ffffffffffffffff16610a9a565b61098983600161096a565b604051602001610390929190611806565b606081156109c25750506040805180820190915260048152637472756560e01b602082015290565b505060408051808201909152600581527f66616c7365000000000000000000000000000000000000000000000000000000602082015290565b80516060908160015b82811015610a92576000858281518110610a2057610a20611470565b6020026020010151604051602001610a38919061185d565b60405160208183030381529060405290508251600003610a5a57809250610a7f565b8281604051602001610a6d929190611346565b60405160208183030381529060405292505b5080610a8a816114bb565b915050610a04565b509392505050565b606081600003610ac15750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610aeb5780610ad5816114bb565b9150610ae49050600a83611332565b9150610ac5565b60008167ffffffffffffffff811115610b0657610b06610c4d565b6040519080825280601f01601f191660200182016040528015610b30576020820181803683370190505b5090505b8415610bb357610b4560018361188b565b9150610b52600a8661189e565b610b5d9060306118b2565b60f81b818381518110610b7257610b72611470565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350610bac600a86611332565b9450610b34565b949350505050565b600060208284031215610bcd57600080fd5b5035919050565b60005b83811015610bef578181015183820152602001610bd7565b50506000910152565b6020815260008251806020840152610c17816040850160208701610bd4565b601f01601f19169190910160400192915050565b60008060408385031215610c3e57600080fd5b50508035926020909101359150565b634e487b7160e01b600052604160045260246000fd5b6040516101a0810167ffffffffffffffff81118282101715610c8757610c87610c4d565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715610cb657610cb6610c4d565b604052919050565b600082601f830112610ccf57600080fd5b6040516040810167ffffffffffffffff8282108183111715610cf357610cf3610c4d565b60409182528291850186811115610d0957600080fd5b855b81811015610d325780518381168114610d245760008081fd5b845260209384019301610d0b565b50929695505050505050565b600067ffffffffffffffff821115610d5857610d58610c4d565b5060051b60200190565b600082601f830112610d7357600080fd5b81516020610d88610d8383610d3e565b610c8d565b82815260059290921b84018101918181019086841115610da757600080fd5b8286015b84811015610dc25780518352918301918301610dab565b509695505050505050565b600082601f830112610dde57600080fd5b81516020610dee610d8383610d3e565b82815260059290921b84018101918181019086841115610e0d57600080fd5b8286015b84811015610dc25780516001600160a01b0381168114610e315760008081fd5b8352918301918301610e11565b805161ffff81168114610e5057600080fd5b919050565b80518015158114610e5057600080fd5b600082601f830112610e7657600080fd5b815167ffffffffffffffff811115610e9057610e90610c4d565b610ea3601f8201601f1916602001610c8d565b818152846020838601011115610eb857600080fd5b610bb3826020830160208701610bd4565b600060208284031215610edb57600080fd5b815167ffffffffffffffff80821115610ef357600080fd5b908301906101e08286031215610f0857600080fd5b610f10610c63565b82518152610f218660208501610cbe565b6020820152610f338660608501610cbe565b604082015260a083015182811115610f4a57600080fd5b610f5687828601610d62565b60608301525060c083015182811115610f6e57600080fd5b610f7a87828601610d62565b60808301525060e083015182811115610f9257600080fd5b610f9e87828601610d62565b60a0830152506101008084015183811115610fb857600080fd5b610fc488828701610dcd565b60c0840152506101208085015160e0840152610140610fe4818701610e3e565b838501526101609250610ff8838701610e55565b828501526101809150818601518581111561101257600080fd5b61101e8a828901610e65565b8286015250506101a08501518481111561103757600080fd5b61104389828801610e65565b83850152506101c085015191508382111561105d57600080fd5b61106988838701610e65565b908301525095945050505050565b60008151611089818560208601610bd4565b9290920192915050565b7f646174613a6170706c69636174696f6e2f6a736f6e3b7b226e616d65223a22008152600084516110cb81601f850160208901610bd4565b701116113232b9b1b934b83a34b7b7111d1160791b601f9184019182015284516110fc816030840160208901610bd4565b6f222c2270726f70657274696573223a5b60801b60309290910191820152835161112d816040840160208801610bd4565b615d7d60f01b6040929091019182015260420195945050505050565b7f646174613a6170706c69636174696f6e2f6a736f6e3b7b226e616d65223a220081526000855161118181601f850160208a01610bd4565b701116113232b9b1b934b83a34b7b7111d1160791b601f9184019182015285516111b2816030840160208a01610bd4565b6f222c2270726f70657274696573223a5b60801b6030929091019182015284516111e3816040840160208901610bd4565b600b60fa1b604092909101918201528351611205816041840160208801610bd4565b615d7d60f01b604192909101918201526043019695505050505050565b6000885160206112358285838e01610bd4565b8184019150600b60fa1b8083528a516112548160018601858f01610bd4565b6001930192830181905289516112708160028601858e01610bd4565b60029301928301819052885161128c8160038601858d01610bd4565b6003930192830181905287516112a88160048601858c01610bd4565b600493019283015285516112c28160058501848a01610bd4565b600b60fa1b60059390910192830152506112df6006820185611077565b9a9950505050505050505050565b6000602082840312156112ff57600080fd5b5051919050565b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60008261134157611341611306565b500490565b60008351611358818460208801610bd4565b600b60fa1b9083019081528351611376816001840160208801610bd4565b01600101949350505050565b683d913730b6b2911d1160b91b8152600085516113a6816009850160208a01610bd4565b701116113232b9b1b934b83a34b7b7111d1160791b60099184019182015285516113d781601a840160208a01610bd4565b7f222c2276616c7565223a22000000000000000000000000000000000000000000601a92909101918201528451611415816025840160208901610bd4565b7f222c2269735f696e7472696e736963223a220000000000000000000000000000602592909101918201528351611453816037840160208801610bd4565b61227d60f01b603792909101918201526039019695505050505050565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561149857600080fd5b815167ffffffffffffffff8111156114af57600080fd5b610bb384828501610e65565b6000600182016114cd576114cd61131c565b5060010190565b7f7b226e616d65223a22776f726b5f73636f706573222c2264657363726970746981527f6f6e223a22225468652073636f706573206f6620776f726b206f66207468652060208201527f636c61696d2e22222c2276616c7565223a000000000000000000000000000000604082015260008351611558816051850160208801610bd4565b70161134b9afb4b73a3934b739b4b1911d1160791b605193909101928301525090151560f81b606282015261227d60f01b6063820152606501919050565b7f7b226e616d65223a22696d706163745f73636f706573222c226465736372697081527f74696f6e223a225468652073636f706573206f6620696d70616374206f66207460208201527f686520636c61696d2e222c2276616c7565223a0000000000000000000000000060408201526000835161161a816053850160208801610bd4565b70161134b9afb4b73a3934b739b4b1911d1160791b605393909101928301525090151560f81b606482015261227d60f01b6065820152606701919050565b7f7b226e616d65223a22726967687473222c226465736372697074696f6e223a2281527f526967687473206173736f6369617465642077697468206f776e696e6720746860208201527f652068797065726365727420286672616374696f6e7329222c2276616c7565226040820152601d60f91b6060820152600083516116e6816061850160208801610bd4565b70161134b9afb4b73a3934b739b4b1911d1160791b606193909101928301525090151560f81b607282015261227d60f01b6073820152607501919050565b683d913730b6b2911d1160b91b815260008551611748816009850160208a01610bd4565b701116113232b9b1b934b83a34b7b7111d1160791b600991840191820152855161177981601a840160208a01610bd4565b7f222c2276616c7565223a00000000000000000000000000000000000000000000601a929091019182015284516117b7816024840160208901610bd4565b70161134b9afb4b73a3934b739b4b1911d1160791b6024929091019182015283516117e9816035840160208801610bd4565b61227d60f01b603592909101918201526037019695505050505050565b605b60f81b815260008351611822816001850160208801610bd4565b600b60fa1b6001918401918201528351611843816002840160208801610bd4565b605d60f81b60029290910191820152600301949350505050565b6000601160f91b808352835161187a816001860160208801610bd4565b600193019283015250600201919050565b818103818111156101d2576101d261131c565b6000826118ad576118ad611306565b500690565b808201808211156101d2576101d261131c56fe546f74616c20756e69747320697373756564206163726f737320616c6c20746f6b656e732077697468207468697320736c6f742e555249206f66206164646974696f6e616c20646174612072656c6174656420746f2074686520636c61696d2e54686520706572696f6420647572696e672077686963682074686520696d706163742072656c6174696e6720746f2074686520636c61696d20776173206d6164652e54686520706572696f6420647572696e672077686963682074686520776f726b2072656c6174696e6720746f2074686520636c61696d2077617320646f6e652ea164736f6c6343000810000a";

type HypercertMetadataConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HypercertMetadataConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HypercertMetadata__factory extends ContractFactory {
  constructor(...args: HypercertMetadataConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<HypercertMetadata> {
    return super.deploy(overrides || {}) as Promise<HypercertMetadata>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): HypercertMetadata {
    return super.attach(address) as HypercertMetadata;
  }
  override connect(signer: Signer): HypercertMetadata__factory {
    return super.connect(signer) as HypercertMetadata__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HypercertMetadataInterface {
    return new utils.Interface(_abi) as HypercertMetadataInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HypercertMetadata {
    return new Contract(address, _abi, signerOrProvider) as HypercertMetadata;
  }
}