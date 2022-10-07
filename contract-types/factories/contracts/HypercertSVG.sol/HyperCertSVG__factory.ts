/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  HyperCertSVG,
  HyperCertSVGInterface,
} from "../../../contracts/HypercertSVG.sol/HyperCertSVG";
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
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "BackgroundAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "svgString",
        type: "string",
      },
    ],
    name: "addBackground",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "scopesOfImpact",
        type: "string[]",
      },
      {
        internalType: "uint64[2]",
        name: "workTimeframe",
        type: "uint64[2]",
      },
      {
        internalType: "uint64[2]",
        name: "impactTimeframe",
        type: "uint64[2]",
      },
      {
        internalType: "uint256",
        name: "units",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalUnits",
        type: "uint256",
      },
    ],
    name: "generateSvgFraction",
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
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "scopesOfImpact",
        type: "string[]",
      },
      {
        internalType: "uint64[2]",
        name: "workTimeframe",
        type: "uint64[2]",
      },
      {
        internalType: "uint64[2]",
        name: "impactTimeframe",
        type: "uint64[2]",
      },
      {
        internalType: "uint256",
        name: "totalUnits",
        type: "uint256",
      },
    ],
    name: "generateSvgHyperCert",
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
        name: "part",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "whole",
        type: "uint256",
      },
    ],
    name: "getPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "percent",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600060015534801561001557600080fd5b50612aa6806100256000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80635e70664c1461005157806362219866146100775780638ac1da721461008a57806394a2eeb8146100aa575b600080fd5b61006461005f36600461170b565b6100bd565b6040519081526020015b60405180910390f35b610064610085366004611740565b610129565b61009d610098366004611875565b610176565b60405161006e919061195f565b61009d6100b8366004611979565b6101bb565b60015460008181526020819052604090206100d88382611a91565b506040518181527fabb811cda210349363acfb5609934d3717818d26783decefcd058c05030652f09060200160405180910390a1600180600082825461011e9190611b67565b909155509092915050565b60008061013984620186a0611b7a565b905083811161014757600080fd5b60006101538483611baf565b61015e906005611b67565b905061016b600a82611baf565b925050505b92915050565b60606101806115f4565b8781526020810187905260408101869052606081018590526080810184905260a081018390526101af816101f8565b98975050505050505050565b60606101c56115f4565b86815260208101869052604081018590526060810184905260a081018390526101ed81610263565b979650505050505050565b60606102026102ae565b61020a610343565b610213846103fe565b61021c856105d3565b61022586610a8e565b61022e87610bd0565b61023788610cbd565b60405160200161024d9796959493929190611bdf565b6040516020818303038152906040529050919050565b606061026d6102ae565b610275610343565b61027e846103fe565b610287856105d3565b61029086610a8e565b61029987610cbd565b60405160200161024d96959493929190611d2e565b606060405160200161032f907f3c726563742069643d226261636b67726f756e642d636f6c6f722d322220783d81527f222e352220793d2230222077696474683d2235353022206865696768743d223860208201527f3530222072783d223332222072793d223332222f3e0000000000000000000000604082015260550190565b604051602081830303815290604052905090565b60008080526020527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb580546060919061037b90611a08565b80601f01602080910402602001604051908101604052809291908181526020018280546103a790611a08565b80156103f45780601f106103c9576101008083540402835291602001916103f4565b820191906000526020600020905b8154815290600101906020018083116103d757829003601f168201915b5050505050905090565b60606000806000610433856040015160006002811061041f5761041f611e68565b602002015167ffffffffffffffff16610d90565b9250925092506000806000610458886040015160016002811061041f5761041f611e68565b925092509250604051602001610503907f3c706174682069643d22666f726567726f756e642d636f6c6f722d322220643d81527f224d3433352c3737372e383348313135762d3530483433357635305a6d302d3560208201527f33322e3833483131357633363048343335563234355a6d302d3132322e38334860408201527f313135762d3530483433357635305a222f3e0000000000000000000000000000606082015260720190565b60405160208183030381529060405261051b87610daf565b61052487610daf565b61052d87610daf565b60405160200161053f93929190611e7e565b60405160208183030381529060405261055785610daf565b61056085610daf565b61056985610daf565b60405160200161057b93929190611e7e565b60408051601f19818403018152908290526105999291602001611ed8565b60408051601f19818403018152908290526105b79291602001612144565b6040516020818303038152906040529650505050505050919050565b6060600082600001516040516020016105ec9190612173565b60408051601f19818403018152828252855183830183526000808552602094850181905283518085019094528151845290840193830193909352925061063190610ed0565b9050600d811115610a48578351604080518082018252600080825260209182018190528251808401845284518152938201848301528251808401845260018152600160fd1b8184019081528451808601865283815284018390528451808601865291518252818401528351600680825260e082019095529093919283928392839290919082015b60408051808201909152600080825260208201528152602001906001900390816106b85750506040805160038082526080820190925291925060009190602082015b60608152602001906001900390816106fa5790505090505b60038510156109715760006107278888610fa9565b905061073281511590565b156107cc578783868151811061074a5761074a611e68565b60200260200101819052506107a9836107a3604051806040016040528060018152602001600160fd1b81525060408051808201825260008082526020918201528151808301909252825182529182019181019190915290565b90610fcf565b8287815181106107bb576107bb611e68565b602002602001018190525050610971565b600a6107d782610ed0565b6107e19086611b67565b111561092a578560020361084957604080518082018252600381526217171760e91b6020808301918252835180850185526000808252908201528351808501909452915183529082015283868151811061083d5761083d611e68565b60200260200101819052505b60408051808201825260018152600160fd1b6020808301918252835180850185526000808252908201528351808501909452915183529082015261088e9084906107a3565b8287815181106108a0576108a0611e68565b60209081029190910101526108b6600187611b67565b60408051600680825260e08201909252919750816020015b60408051808201909152600080825260208201528152602001906001900390816108ce579050509250808360008151811061090b5761090b611e68565b602002602001018190525061091f81610ed0565b93506001945061096b565b61093381610ed0565b61093d9085611b67565b93508083868151811061095257610952611e68565b6020908102919091010152610968600186611b67565b94505b50610712565b8060008151811061098457610984611e68565b602002602001015160405160200161099c9190612173565b604051602081830303815290604052816001815181106109be576109be611e68565b60200260200101516040516020016109d691906121ca565b604051602081830303815290604052826002815181106109f8576109f8611e68565b6020026020010151604051602001610a109190612221565b60408051601f1981840301815290829052610a2f939291602001612259565b6040516020818303038152906040529850505050505050505b81604051602001610a59919061229c565b60408051601f1981840301815290829052610a769160200161237a565b60405160208183030381529060405292505050919050565b606060008260200151600081518110610aa957610aa9611e68565b6020026020010151604051602001610ac19190612173565b60408051601f198184030181529190526020840151519091506001811115610bbf578360200151600081518110610afa57610afa611e68565b6020026020010151604051602001610b1291906123fd565b6040516020818303038152906040528460200151600181518110610b3857610b38611e68565b6020026020010151604051602001610b509190612173565b6040516020818303038152906040528560200151600281518110610b7657610b76611e68565b6020026020010151604051602001610b8e9190612454565b60408051601f1981840301815290829052610bad939291602001612259565b60405160208183030381529060405291505b81604051602001610a76919061248c565b6060610c156040518060400160405280600781526020017f556e6974733a20000000000000000000000000000000000000000000000000008152508360800151611173565b610c586040518060400160405280600c81526020017f746f74616c556e6974733a2000000000000000000000000000000000000000008152508360a00151611173565b6000610c6c83608001518460a00151610129565b9050610c798160026111d1565b604051602001610c8991906125b6565b60408051601f1981840301815290829052610ca6916020016125dc565b604051602081830303815290604052915050919050565b60606000806000610cde856060015160006002811061041f5761041f611e68565b9250925092506000806000610d03886060015160016002811061041f5761041f611e68565b925092509250610d1286610daf565b610d1b86610daf565b610d2486610daf565b604051602001610d3693929190611e7e565b604051602081830303815290604052610d4e84610daf565b610d5784610daf565b610d6084610daf565b604051602001610d7293929190611e7e565b60408051601f19818403018152908290526105b7929160200161272c565b60008080610da26201518085046112fd565b9196909550909350915050565b606081600003610dd65750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610e005780610dea816128cf565b9150610df99050600a83611baf565b9150610dda565b60008167ffffffffffffffff811115610e1b57610e1b611654565b6040519080825280601f01601f191660200182016040528015610e45576020820181803683370190505b5090505b8415610ec857610e5a6001836128e8565b9150610e67600a866128fb565b610e72906030611b67565b60f81b818381518110610e8757610e87611e68565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350610ec1600a86611baf565b9450610e49565b949350505050565b600080601f8360200151610ee491906128e8565b8351909150600090610ef69083611b67565b9050600092505b80821015610fa257815160ff166080811015610f2557610f1e600184611b67565b9250610f8f565b60e08160ff161015610f3c57610f1e600284611b67565b60f08160ff161015610f5357610f1e600384611b67565b60f88160ff161015610f6a57610f1e600484611b67565b60fc8160ff161015610f8157610f1e600584611b67565b610f8c600684611b67565b92505b5082610f9a816128cf565b935050610efd565b5050919050565b6040805180820190915260008082526020820152610fc8838383611399565b5092915050565b60608151600003610fef5750604080516020810190915260008152610170565b600060018351610fff91906128e8565b845161100b9190611b7a565b905060005b83518110156110565783818151811061102b5761102b611e68565b602002602001015160000151826110429190611b67565b91508061104e816128cf565b915050611010565b5060008167ffffffffffffffff81111561107257611072611654565b6040519080825280601f01601f19166020018201604052801561109c576020820181803683370190505b5090506020810160005b8551811015611168576110f4828783815181106110c5576110c5611e68565b6020026020010151602001518884815181106110e3576110e3611e68565b602002602001015160000151611444565b85818151811061110657611106611e68565b6020026020010151600001518261111d9190611b67565b91506001865161112d91906128e8565b811015611156576111478288602001518960000151611444565b86516111539083611b67565b91505b80611160816128cf565b9150506110a6565b509095945050505050565b6111cd828260405160240161118992919061290f565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16632d839cb360e21b1790526114be565b5050565b60606112126040518060400160405280600681526020017f53656c663a20000000000000000000000000000000000000000000000000000081525084611173565b600061121f83600a612a15565b905060006112356112308387611baf565b610daf565b9050600061124661123084886128fb565b90506000815190506000836040516020016112619190612a24565b60405160208183030381529060405290508660ff168210156112ce5760005b61128d8360ff8a166128e8565b8160ff1610156112cc57816040516020016112a89190612a49565b604051602081830303815290604052915080806112c490612a6e565b915050611280565b505b80836040516020016112e1929190612144565b6040516020818303038152906040529550505050505092915050565b60008080836226496581018262023ab1600483020590506004600362023ab18302010590910390600062164b09610fa0600185010205905060046105b58202058303601f019250600061098f846050028161135a5761135a611b99565b0590506000605061098f83020585039050600b820560301994909401606402929092018301996002600c90940290910392909201975095509350505050565b604080518082019091526000808252602082015260006113cb85600001518660200151866000015187602001516114df565b6020808701805191860191909152519091506113e790826128e8565b8352845160208601516113fa9190611b67565b8103611409576000855261143b565b835183516114179190611b67565b855186906114269083906128e8565b90525083516114359082611b67565b60208601525b50909392505050565b6020811061147c578151835261145b602084611b67565b9250611468602083611b67565b91506114756020826128e8565b9050611444565b60001981156114ab5760016114928360206128e8565b61149e90610100612a8d565b6114a891906128e8565b90505b9151835183169219169190911790915250565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b600083818685116115ea5760208511611599576000851561152b5760016115078760206128e8565b611512906008611b7a565b61151d906002612a8d565b61152791906128e8565b1990505b8451811660008761153c8b8b611b67565b61154691906128e8565b855190915083165b82811461158b57818610611573576115668b8b611b67565b9650505050505050610ec8565b8561157d816128cf565b96505083865116905061154e565b859650505050505050610ec8565b508383206000905b6115ab86896128e8565b82116115e8578583208082036115c75783945050505050610ec8565b6115d2600185611b67565b93505081806115e0906128cf565b9250506115a1565b505b6101ed8787611b67565b6040518060c001604052806060815260200160608152602001611615611636565b8152602001611622611636565b815260200160008152602001600081525090565b60405180604001604052806002906020820280368337509192915050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561169357611693611654565b604052919050565b600082601f8301126116ac57600080fd5b813567ffffffffffffffff8111156116c6576116c6611654565b6116d9601f8201601f191660200161166a565b8181528460208386010111156116ee57600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561171d57600080fd5b813567ffffffffffffffff81111561173457600080fd5b610ec88482850161169b565b6000806040838503121561175357600080fd5b50508035926020909101359150565b600082601f83011261177357600080fd5b8135602067ffffffffffffffff8083111561179057611790611654565b8260051b61179f83820161166a565b93845285810183019383810190888611156117b957600080fd5b84880192505b858310156101af578235848111156117d75760008081fd5b6117e58a87838c010161169b565b83525091840191908401906117bf565b600082601f83011261180657600080fd5b6040516040810167ffffffffffffffff828210818311171561182a5761182a611654565b6040918252829185018681111561184057600080fd5b855b81811015611869578035838116811461185b5760008081fd5b845260209384019301611842565b50929695505050505050565b600080600080600080610100878903121561188f57600080fd5b863567ffffffffffffffff808211156118a757600080fd5b6118b38a838b0161169b565b975060208901359150808211156118c957600080fd5b506118d689828a01611762565b9550506118e688604089016117f5565b93506118f588608089016117f5565b925060c0870135915060e087013590509295509295509295565b60005b8381101561192a578181015183820152602001611912565b50506000910152565b6000815180845261194b81602086016020860161190f565b601f01601f19169290920160200192915050565b6020815260006119726020830184611933565b9392505050565b600080600080600060e0868803121561199157600080fd5b853567ffffffffffffffff808211156119a957600080fd5b6119b589838a0161169b565b965060208801359150808211156119cb57600080fd5b506119d888828901611762565b9450506119e887604088016117f5565b92506119f787608088016117f5565b9497939650919460c0013592915050565b600181811c90821680611a1c57607f821691505b602082108103611a3c57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115611a8c57600081815260208120601f850160051c81016020861015611a695750805b601f850160051c820191505b81811015611a8857828155600101611a75565b5050505b505050565b815167ffffffffffffffff811115611aab57611aab611654565b611abf81611ab98454611a08565b84611a42565b602080601f831160018114611af45760008415611adc5750858301515b600019600386901b1c1916600185901b178555611a88565b600085815260208120601f198616915b82811015611b2357888601518255948401946001909101908401611b04565b5085821015611b415787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b8082018082111561017057610170611b51565b6000816000190483118215151615611b9457611b94611b51565b500290565b634e487b7160e01b600052601260045260246000fd5b600082611bbe57611bbe611b99565b500490565b60008151611bd581856020860161190f565b9290920192915050565b7f3c7376672077696474683d2235353022206865696768743d223835302220766981527f6577426f783d2230203020353530203835302220786d6c6e733d22687474703a60208201527f2f2f7777772e77332e6f72672f323030302f7376672220786d6c6e733a786c6960408201527f6e6b3d22687474703a2f2f7777772e77332e6f72672f313939392f786c696e6b606082015261111f60f11b608082015260006082820189516020611c968284838f0161190f565b8a519190920191611caa8284838e0161190f565b89519190920191611cbe8284838d0161190f565b88519190920191611cd28284838c0161190f565b87519190920191611ce68284838b0161190f565b86519190920191611cfa8284838a0161190f565b85519190920191611d0e828483890161190f565b50651e17b9bb339f60d11b91019081526006019998505050505050505050565b7f3c7376672077696474683d2235353022206865696768743d223835302220766981527f6577426f783d2230203020353530203835302220786d6c6e733d22687474703a60208201527f2f2f7777772e77332e6f72672f323030302f7376672220786d6c6e733a786c6960408201527f6e6b3d22687474703a2f2f7777772e77332e6f72672f313939392f786c696e6b606082015261111f60f11b608082015260006082820188516020611de58284838e0161190f565b89519190920191611df98284838d0161190f565b88519190920191611e0d8284838c0161190f565b87519190920191611e218284838b0161190f565b86519190920191611e358284838a0161190f565b85519190920191611e49828483890161190f565b50651e17b9bb339f60d11b910190815260060198975050505050505050565b634e487b7160e01b600052603260045260246000fd5b60008451611e9081846020890161190f565b8083019050602d60f81b8082528551611eb0816001850160208a0161190f565b60019201918201528351611ecb81600284016020880161190f565b0160020195945050505050565b7f3c672069643d22646976696465722d636f6c6f722220746578742d72656e646581527f72696e673d226f7074696d697a6553706565642220666f6e742d73697a653d2260208201527f3130222066696c6c3d2223666663653433223e0000000000000000000000000060408201527f3c706174682069643d22646976696465722d636f6c6f722d322220643d224d3160538201527f35362e33352c3531342e3539683233372e333122207374796c653d2266696c6c60738201527f3a206e6f6e653b207374726f6b653a20236666636534333b207374726f6b652d60938201527f6d697465726c696d69743a2031303b207374726f6b652d77696474683a20327060b38201527f783b222f3e00000000000000000000000000000000000000000000000000000060d38201527f3c746578742069643d22776f726b2d706572696f642d636f6c6f72222074726160d88201527f6e73666f726d3d227472616e736c617465283133342e3735203130322e30362960f88201527f22207374796c653d22666f6e742d66616d696c793a2048656c7665746963613b6101188201527f20666f6e742d73697a653a20313570783b223e000000000000000000000000006101388201527f3c747370616e20783d22302220793d223022207374796c653d226c657474657261014b8201527f2d73706163696e673a202d2e3035656d3b223e576f726b20506572696f643a2061016b8201526000610ec861211b61211561210661018b860188611bc3565b620101f160ed1b815260030190565b85611bc3565b7f3c2f747370616e3e3c2f746578743e3c2f673e00000000000000000000000000815260130190565b6000835161215681846020880161190f565b83519083019061216a81836020880161190f565b01949350505050565b7f3c747370616e20783d22302220793d2230223e000000000000000000000000008152600082516121ab81601385016020870161190f565b671e17ba39b830b71f60c11b6013939091019283015250601b01919050565b7f3c747370616e20783d22302220793d223336223e00000000000000000000000081526000825161220281601485016020870161190f565b671e17ba39b830b71f60c11b6014939091019283015250601c01919050565b7f3c747370616e20783d22302220793d223732223e00000000000000000000000081526000825161220281601485016020870161190f565b6000845161226b81846020890161190f565b84519083019061227f81836020890161190f565b845191019061229281836020880161190f565b0195945050505050565b7f3c746578742069643d226e616d652d636f6c6f722d3222207472616e73666f7281527f6d3d227472616e736c617465283135362e3335203330302922207374796c653d60208201527f2266696c6c3a20236666636534333b20666f6e742d66616d696c793a204d6f6e60408201527f61636f3b223e000000000000000000000000000000000000000000000000000060608201526000825161234681606685016020870161190f565b7f3c2f746578743e000000000000000000000000000000000000000000000000006066939091019283015250606d01919050565b7f3c672069643d226e616d652d636f6c6f722220746578742d72656e646572696e81527f673d226f7074696d697a6553706565642220666f6e742d73697a653d223330226020820152601f60f91b6040820152600082516123e281604185016020870161190f565b631e17b39f60e11b6041939091019283015250604501919050565b7f3c747370616e20783d22302220793d222d3230223e000000000000000000000081526000825161243581601585016020870161190f565b671e17ba39b830b71f60c11b6015939091019283015250601d01919050565b7f3c747370616e20783d22302220793d223230223e00000000000000000000000081526000825161220281601485016020870161190f565b7f3c672069643d226465736372697074696f6e2d636f6c6f722220746578742d7281527f656e646572696e673d226f7074696d697a6553706565642220666f6e742d736960208201527f7a653d223135222066696c6c3d227768697465223e000000000000000000000060408201527f3c74657874207472616e73666f726d3d227472616e736c61746528313535203460558201527f38302922207374796c653d22666f6e742d66616d696c793a2048656c7665746960758201527f63613b20666f6e742d73697a653a20313570783b223e000000000000000000006095820152600082516125828160ab85016020870161190f565b7f3c2f746578743e3c2f673e00000000000000000000000000000000000000000060ab93909101928301525060b601919050565b600082516125c881846020870161190f565b61202560f01b920191825250600201919050565b7f3c672069643d226672616374696f6e2d636f6c6f722220746578742d72656e6481527f6572696e673d226f7074696d697a6553706565642220666f6e742d73697a653d60208201527f223330223e00000000000000000000000000000000000000000000000000000060408201527f3c746578742069643d226672616374696f6e2d636f6c6f722d3222207472616e60458201527f73666f726d3d227472616e736c617465283135362e3335203536382e3033292260658201527f207374796c653d2266696c6c3a20236666636534333b20666f6e742d66616d6960858201527f6c793a204d6f6e61636f223e3c747370616e20783d22302220793d2230223e0060a5820152600082516126f88160c485016020870161190f565b7f3c2f747370616e3e3c2f746578743e3c2f673e0000000000000000000000000060c493909101928301525060d701919050565b7f3c672069643d22696d706163742d706572696f642d636f6c6f7222207465787481527f2d72656e646572696e673d226f7074696d697a6553706565642220666f6e742d60208201527f73697a653d223130222066696c6c3d2223666663653433223e0000000000000060408201527f3c746578742069643d22696d706163742d706572696f642d636f6c6f722d322260598201527f207472616e73666f726d3d227472616e736c617465283133342e37352037353860798201527f2922207374796c653d22666f6e742d66616d696c793a2048656c76657469636160998201527f3b20666f6e742d73697a653a20313570783b223e00000000000000000000000060b98201527f3c747370616e20783d22302220793d223022207374796c653d226c657474657260cd8201527f2d73706163696e673a202d2e3035656d3b223e496d7061637420506572696f6460ed8201526101d160f51b61010d820152600061010f84516128a2818386016020890161190f565b6128c561211b6128bf8484880101620101f160ed1b815260030190565b87611bc3565b9695505050505050565b6000600182016128e1576128e1611b51565b5060010190565b8181038181111561017057610170611b51565b60008261290a5761290a611b99565b500690565b6040815260006129226040830185611933565b90508260208301529392505050565b600181815b8085111561296c57816000190482111561295257612952611b51565b8085161561295f57918102915b93841c9390800290612936565b509250929050565b60008261298357506001610170565b8161299057506000610170565b81600181146129a657600281146129b0576129cc565b6001915050610170565b60ff8411156129c1576129c1611b51565b50506001821b610170565b5060208310610133831016604e8410600b84101617156129ef575081810a610170565b6129f98383612931565b8060001904821115612a0d57612a0d611b51565b029392505050565b600061197260ff841683612974565b60008251612a3681846020870161190f565b601760f91b920191825250600101919050565b60008251612a5b81846020870161190f565b600360fc1b920191825250600101919050565b600060ff821660ff8103612a8457612a84611b51565b60010192915050565b6000611972838361297456fea164736f6c6343000810000a";

type HyperCertSVGConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HyperCertSVGConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HyperCertSVG__factory extends ContractFactory {
  constructor(...args: HyperCertSVGConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<HyperCertSVG> {
    return super.deploy(overrides || {}) as Promise<HyperCertSVG>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): HyperCertSVG {
    return super.attach(address) as HyperCertSVG;
  }
  override connect(signer: Signer): HyperCertSVG__factory {
    return super.connect(signer) as HyperCertSVG__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HyperCertSVGInterface {
    return new utils.Interface(_abi) as HyperCertSVGInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HyperCertSVG {
    return new Contract(address, _abi, signerOrProvider) as HyperCertSVG;
  }
}
