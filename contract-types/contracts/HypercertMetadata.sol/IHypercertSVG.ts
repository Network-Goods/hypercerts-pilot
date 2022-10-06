/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface IHypercertSVGInterface extends utils.Interface {
  functions: {
    "generateSvgFraction(string,string[],uint64[2],uint64[2],uint256,uint256)": FunctionFragment;
    "generateSvgHypercert(string,string[],uint64[2],uint64[2],uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "generateSvgFraction" | "generateSvgHypercert"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "generateSvgFraction",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "generateSvgHypercert",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "generateSvgFraction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "generateSvgHypercert",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IHypercertSVG extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IHypercertSVGInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    generateSvgFraction(
      name: PromiseOrValue<string>,
      scopesOfImpact: PromiseOrValue<string>[],
      workTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      impactTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      units: PromiseOrValue<BigNumberish>,
      totalUnits: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    generateSvgHypercert(
      name: PromiseOrValue<string>,
      scopesOfImpact: PromiseOrValue<string>[],
      workTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      impactTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      totalUnits: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  generateSvgFraction(
    name: PromiseOrValue<string>,
    scopesOfImpact: PromiseOrValue<string>[],
    workTimeframe: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    impactTimeframe: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ],
    units: PromiseOrValue<BigNumberish>,
    totalUnits: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  generateSvgHypercert(
    name: PromiseOrValue<string>,
    scopesOfImpact: PromiseOrValue<string>[],
    workTimeframe: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>],
    impactTimeframe: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ],
    totalUnits: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    generateSvgFraction(
      name: PromiseOrValue<string>,
      scopesOfImpact: PromiseOrValue<string>[],
      workTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      impactTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      units: PromiseOrValue<BigNumberish>,
      totalUnits: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    generateSvgHypercert(
      name: PromiseOrValue<string>,
      scopesOfImpact: PromiseOrValue<string>[],
      workTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      impactTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      totalUnits: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    generateSvgFraction(
      name: PromiseOrValue<string>,
      scopesOfImpact: PromiseOrValue<string>[],
      workTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      impactTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      units: PromiseOrValue<BigNumberish>,
      totalUnits: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    generateSvgHypercert(
      name: PromiseOrValue<string>,
      scopesOfImpact: PromiseOrValue<string>[],
      workTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      impactTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      totalUnits: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    generateSvgFraction(
      name: PromiseOrValue<string>,
      scopesOfImpact: PromiseOrValue<string>[],
      workTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      impactTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      units: PromiseOrValue<BigNumberish>,
      totalUnits: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    generateSvgHypercert(
      name: PromiseOrValue<string>,
      scopesOfImpact: PromiseOrValue<string>[],
      workTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      impactTimeframe: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      totalUnits: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
