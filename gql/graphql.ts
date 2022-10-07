/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Contributor = {
  __typename?: 'Contributor';
  /** hypercert the contributor has contributed to */
  hypercerts: Array<Hypercert>;
  /** contibutor ID is an Ethereum address */
  id: Scalars['ID'];
};


export type ContributorHypercertsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hypercert_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Hypercert_Filter>;
};

export type Contributor_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  hypercerts_?: InputMaybe<Hypercert_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Contributor_OrderBy {
  Hypercerts = 'hypercerts',
  Id = 'id'
}

export type Hypercert = {
  __typename?: 'Hypercert';
  /** fingerprint of the hyperspace claimed by the minter */
  claimHash: Scalars['Bytes'];
  /** array of know addresses representing contributors to this impact claim */
  contributors: Array<Contributor>;
  /** fractions of certificate */
  fractions: Array<HypercertFraction>;
  /** hypercert ID maps to the uint256 slotID in the ERC3525 Hypercert Minter */
  id: Scalars['ID'];
  /** unix timestamp declaring when impact started */
  impactDateFrom: Scalars['BigInt'];
  /** unix timestamp declaring when impact ended */
  impactDateTo: Scalars['BigInt'];
  /** array of impacts declared in claim */
  impactScopes?: Maybe<Array<ImpactScope>>;
  /** unix timestamp of last change to entity */
  lastUpdated: Scalars['BigInt'];
  /** address of the entity claiming the impact */
  minter: Scalars['String'];
  /** array of rights an owner of the impact certificate holds */
  rights?: Maybe<Array<Right>>;
  /** total unit of certificate, used for splitting and merging */
  totalUnits: Scalars['BigInt'];
  /** external reference, usually IPFS CID */
  uri: Scalars['String'];
  /** hypercert version */
  version: Scalars['BigInt'];
  /** unix timestamp declaring when work started */
  workDateFrom: Scalars['BigInt'];
  /** unix timestamp declaring when work ended */
  workDateTo: Scalars['BigInt'];
  /** array of work declared in claim */
  workScopes?: Maybe<Array<WorkScope>>;
};


export type HypercertContributorsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contributor_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Contributor_Filter>;
};


export type HypercertFractionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HypercertFraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HypercertFraction_Filter>;
};


export type HypercertImpactScopesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ImpactScope_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImpactScope_Filter>;
};


export type HypercertRightsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Right_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Right_Filter>;
};


export type HypercertWorkScopesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkScope_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WorkScope_Filter>;
};

export type HypercertFraction = {
  __typename?: 'HypercertFraction';
  /** link to hypercert this fraction relates to */
  hypercert: Hypercert;
  /** fraction ID maps to the uint256 tokenID in the ERC3525 Hypercert Minter */
  id: Scalars['ID'];
  /** address of the entity owning the impact */
  owner: Owner;
  /** units held by the fraction, used for splitting and merging */
  units: Scalars['BigInt'];
};

export type HypercertFraction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  hypercert?: InputMaybe<Scalars['String']>;
  hypercert_?: InputMaybe<Hypercert_Filter>;
  hypercert_contains?: InputMaybe<Scalars['String']>;
  hypercert_contains_nocase?: InputMaybe<Scalars['String']>;
  hypercert_ends_with?: InputMaybe<Scalars['String']>;
  hypercert_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hypercert_gt?: InputMaybe<Scalars['String']>;
  hypercert_gte?: InputMaybe<Scalars['String']>;
  hypercert_in?: InputMaybe<Array<Scalars['String']>>;
  hypercert_lt?: InputMaybe<Scalars['String']>;
  hypercert_lte?: InputMaybe<Scalars['String']>;
  hypercert_not?: InputMaybe<Scalars['String']>;
  hypercert_not_contains?: InputMaybe<Scalars['String']>;
  hypercert_not_contains_nocase?: InputMaybe<Scalars['String']>;
  hypercert_not_ends_with?: InputMaybe<Scalars['String']>;
  hypercert_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  hypercert_not_in?: InputMaybe<Array<Scalars['String']>>;
  hypercert_not_starts_with?: InputMaybe<Scalars['String']>;
  hypercert_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  hypercert_starts_with?: InputMaybe<Scalars['String']>;
  hypercert_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Owner_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  units?: InputMaybe<Scalars['BigInt']>;
  units_gt?: InputMaybe<Scalars['BigInt']>;
  units_gte?: InputMaybe<Scalars['BigInt']>;
  units_in?: InputMaybe<Array<Scalars['BigInt']>>;
  units_lt?: InputMaybe<Scalars['BigInt']>;
  units_lte?: InputMaybe<Scalars['BigInt']>;
  units_not?: InputMaybe<Scalars['BigInt']>;
  units_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum HypercertFraction_OrderBy {
  Hypercert = 'hypercert',
  Id = 'id',
  Owner = 'owner',
  Units = 'units'
}

export type Hypercert_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  claimHash?: InputMaybe<Scalars['Bytes']>;
  claimHash_contains?: InputMaybe<Scalars['Bytes']>;
  claimHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  claimHash_not?: InputMaybe<Scalars['Bytes']>;
  claimHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  claimHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contributors?: InputMaybe<Array<Scalars['String']>>;
  contributors_?: InputMaybe<Contributor_Filter>;
  contributors_contains?: InputMaybe<Array<Scalars['String']>>;
  contributors_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  contributors_not?: InputMaybe<Array<Scalars['String']>>;
  contributors_not_contains?: InputMaybe<Array<Scalars['String']>>;
  contributors_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  fractions_?: InputMaybe<HypercertFraction_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  impactDateFrom?: InputMaybe<Scalars['BigInt']>;
  impactDateFrom_gt?: InputMaybe<Scalars['BigInt']>;
  impactDateFrom_gte?: InputMaybe<Scalars['BigInt']>;
  impactDateFrom_in?: InputMaybe<Array<Scalars['BigInt']>>;
  impactDateFrom_lt?: InputMaybe<Scalars['BigInt']>;
  impactDateFrom_lte?: InputMaybe<Scalars['BigInt']>;
  impactDateFrom_not?: InputMaybe<Scalars['BigInt']>;
  impactDateFrom_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  impactDateTo?: InputMaybe<Scalars['BigInt']>;
  impactDateTo_gt?: InputMaybe<Scalars['BigInt']>;
  impactDateTo_gte?: InputMaybe<Scalars['BigInt']>;
  impactDateTo_in?: InputMaybe<Array<Scalars['BigInt']>>;
  impactDateTo_lt?: InputMaybe<Scalars['BigInt']>;
  impactDateTo_lte?: InputMaybe<Scalars['BigInt']>;
  impactDateTo_not?: InputMaybe<Scalars['BigInt']>;
  impactDateTo_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  impactScopes?: InputMaybe<Array<Scalars['String']>>;
  impactScopes_?: InputMaybe<ImpactScope_Filter>;
  impactScopes_contains?: InputMaybe<Array<Scalars['String']>>;
  impactScopes_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  impactScopes_not?: InputMaybe<Array<Scalars['String']>>;
  impactScopes_not_contains?: InputMaybe<Array<Scalars['String']>>;
  impactScopes_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  lastUpdated?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdated_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minter?: InputMaybe<Scalars['String']>;
  minter_contains?: InputMaybe<Scalars['String']>;
  minter_contains_nocase?: InputMaybe<Scalars['String']>;
  minter_ends_with?: InputMaybe<Scalars['String']>;
  minter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minter_gt?: InputMaybe<Scalars['String']>;
  minter_gte?: InputMaybe<Scalars['String']>;
  minter_in?: InputMaybe<Array<Scalars['String']>>;
  minter_lt?: InputMaybe<Scalars['String']>;
  minter_lte?: InputMaybe<Scalars['String']>;
  minter_not?: InputMaybe<Scalars['String']>;
  minter_not_contains?: InputMaybe<Scalars['String']>;
  minter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  minter_not_ends_with?: InputMaybe<Scalars['String']>;
  minter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  minter_not_in?: InputMaybe<Array<Scalars['String']>>;
  minter_not_starts_with?: InputMaybe<Scalars['String']>;
  minter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  minter_starts_with?: InputMaybe<Scalars['String']>;
  minter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rights?: InputMaybe<Array<Scalars['String']>>;
  rights_?: InputMaybe<Right_Filter>;
  rights_contains?: InputMaybe<Array<Scalars['String']>>;
  rights_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  rights_not?: InputMaybe<Array<Scalars['String']>>;
  rights_not_contains?: InputMaybe<Array<Scalars['String']>>;
  rights_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  totalUnits?: InputMaybe<Scalars['BigInt']>;
  totalUnits_gt?: InputMaybe<Scalars['BigInt']>;
  totalUnits_gte?: InputMaybe<Scalars['BigInt']>;
  totalUnits_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalUnits_lt?: InputMaybe<Scalars['BigInt']>;
  totalUnits_lte?: InputMaybe<Scalars['BigInt']>;
  totalUnits_not?: InputMaybe<Scalars['BigInt']>;
  totalUnits_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  uri?: InputMaybe<Scalars['String']>;
  uri_contains?: InputMaybe<Scalars['String']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_ends_with?: InputMaybe<Scalars['String']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_gt?: InputMaybe<Scalars['String']>;
  uri_gte?: InputMaybe<Scalars['String']>;
  uri_in?: InputMaybe<Array<Scalars['String']>>;
  uri_lt?: InputMaybe<Scalars['String']>;
  uri_lte?: InputMaybe<Scalars['String']>;
  uri_not?: InputMaybe<Scalars['String']>;
  uri_not_contains?: InputMaybe<Scalars['String']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_starts_with?: InputMaybe<Scalars['String']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['BigInt']>;
  version_gt?: InputMaybe<Scalars['BigInt']>;
  version_gte?: InputMaybe<Scalars['BigInt']>;
  version_in?: InputMaybe<Array<Scalars['BigInt']>>;
  version_lt?: InputMaybe<Scalars['BigInt']>;
  version_lte?: InputMaybe<Scalars['BigInt']>;
  version_not?: InputMaybe<Scalars['BigInt']>;
  version_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  workDateFrom?: InputMaybe<Scalars['BigInt']>;
  workDateFrom_gt?: InputMaybe<Scalars['BigInt']>;
  workDateFrom_gte?: InputMaybe<Scalars['BigInt']>;
  workDateFrom_in?: InputMaybe<Array<Scalars['BigInt']>>;
  workDateFrom_lt?: InputMaybe<Scalars['BigInt']>;
  workDateFrom_lte?: InputMaybe<Scalars['BigInt']>;
  workDateFrom_not?: InputMaybe<Scalars['BigInt']>;
  workDateFrom_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  workDateTo?: InputMaybe<Scalars['BigInt']>;
  workDateTo_gt?: InputMaybe<Scalars['BigInt']>;
  workDateTo_gte?: InputMaybe<Scalars['BigInt']>;
  workDateTo_in?: InputMaybe<Array<Scalars['BigInt']>>;
  workDateTo_lt?: InputMaybe<Scalars['BigInt']>;
  workDateTo_lte?: InputMaybe<Scalars['BigInt']>;
  workDateTo_not?: InputMaybe<Scalars['BigInt']>;
  workDateTo_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  workScopes?: InputMaybe<Array<Scalars['String']>>;
  workScopes_?: InputMaybe<WorkScope_Filter>;
  workScopes_contains?: InputMaybe<Array<Scalars['String']>>;
  workScopes_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  workScopes_not?: InputMaybe<Array<Scalars['String']>>;
  workScopes_not_contains?: InputMaybe<Array<Scalars['String']>>;
  workScopes_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum Hypercert_OrderBy {
  ClaimHash = 'claimHash',
  Contributors = 'contributors',
  Fractions = 'fractions',
  Id = 'id',
  ImpactDateFrom = 'impactDateFrom',
  ImpactDateTo = 'impactDateTo',
  ImpactScopes = 'impactScopes',
  LastUpdated = 'lastUpdated',
  Minter = 'minter',
  Rights = 'rights',
  TotalUnits = 'totalUnits',
  Uri = 'uri',
  Version = 'version',
  WorkDateFrom = 'workDateFrom',
  WorkDateTo = 'workDateTo',
  WorkScopes = 'workScopes'
}

export type ImpactScope = {
  __typename?: 'ImpactScope';
  /** array of hypercerts claiming this type of impact */
  hypercerts: Array<Hypercert>;
  /** impaceScope ID maps to byts32 input of 'impactScopes' on Hypercert Minter */
  id: Scalars['ID'];
  /** natural language description of impact scope */
  text: Scalars['String'];
};


export type ImpactScopeHypercertsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hypercert_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Hypercert_Filter>;
};

export type ImpactScope_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  hypercerts_?: InputMaybe<Hypercert_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  text?: InputMaybe<Scalars['String']>;
  text_contains?: InputMaybe<Scalars['String']>;
  text_contains_nocase?: InputMaybe<Scalars['String']>;
  text_ends_with?: InputMaybe<Scalars['String']>;
  text_ends_with_nocase?: InputMaybe<Scalars['String']>;
  text_gt?: InputMaybe<Scalars['String']>;
  text_gte?: InputMaybe<Scalars['String']>;
  text_in?: InputMaybe<Array<Scalars['String']>>;
  text_lt?: InputMaybe<Scalars['String']>;
  text_lte?: InputMaybe<Scalars['String']>;
  text_not?: InputMaybe<Scalars['String']>;
  text_not_contains?: InputMaybe<Scalars['String']>;
  text_not_contains_nocase?: InputMaybe<Scalars['String']>;
  text_not_ends_with?: InputMaybe<Scalars['String']>;
  text_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  text_not_in?: InputMaybe<Array<Scalars['String']>>;
  text_not_starts_with?: InputMaybe<Scalars['String']>;
  text_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  text_starts_with?: InputMaybe<Scalars['String']>;
  text_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum ImpactScope_OrderBy {
  Hypercerts = 'hypercerts',
  Id = 'id',
  Text = 'text'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Owner = {
  __typename?: 'Owner';
  /** owner ID is an Ethereum address */
  id: Scalars['ID'];
};

export type Owner_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Owner_OrderBy {
  Id = 'id'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  contributor?: Maybe<Contributor>;
  contributors: Array<Contributor>;
  hypercert?: Maybe<Hypercert>;
  hypercertFraction?: Maybe<HypercertFraction>;
  hypercertFractions: Array<HypercertFraction>;
  hypercerts: Array<Hypercert>;
  impactScope?: Maybe<ImpactScope>;
  impactScopes: Array<ImpactScope>;
  owner?: Maybe<Owner>;
  owners: Array<Owner>;
  right?: Maybe<Right>;
  rights: Array<Right>;
  workScope?: Maybe<WorkScope>;
  workScopes: Array<WorkScope>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryContributorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContributorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contributor_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contributor_Filter>;
};


export type QueryHypercertArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHypercertFractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHypercertFractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HypercertFraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HypercertFraction_Filter>;
};


export type QueryHypercertsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hypercert_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Hypercert_Filter>;
};


export type QueryImpactScopeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryImpactScopesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ImpactScope_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ImpactScope_Filter>;
};


export type QueryOwnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOwnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Owner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Owner_Filter>;
};


export type QueryRightArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRightsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Right_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Right_Filter>;
};


export type QueryWorkScopeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWorkScopesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkScope_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WorkScope_Filter>;
};

export type Right = {
  __typename?: 'Right';
  /** array of hypercerts claiming these type of rights */
  hypercerts: Array<Hypercert>;
  /** impaceScope ID maps to bytes32 input of 'rights' on Hypercert Minter */
  id: Scalars['ID'];
  /** natural language description of rights the owner holds */
  text: Scalars['String'];
};


export type RightHypercertsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hypercert_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Hypercert_Filter>;
};

export type Right_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  hypercerts_?: InputMaybe<Hypercert_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  text?: InputMaybe<Scalars['String']>;
  text_contains?: InputMaybe<Scalars['String']>;
  text_contains_nocase?: InputMaybe<Scalars['String']>;
  text_ends_with?: InputMaybe<Scalars['String']>;
  text_ends_with_nocase?: InputMaybe<Scalars['String']>;
  text_gt?: InputMaybe<Scalars['String']>;
  text_gte?: InputMaybe<Scalars['String']>;
  text_in?: InputMaybe<Array<Scalars['String']>>;
  text_lt?: InputMaybe<Scalars['String']>;
  text_lte?: InputMaybe<Scalars['String']>;
  text_not?: InputMaybe<Scalars['String']>;
  text_not_contains?: InputMaybe<Scalars['String']>;
  text_not_contains_nocase?: InputMaybe<Scalars['String']>;
  text_not_ends_with?: InputMaybe<Scalars['String']>;
  text_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  text_not_in?: InputMaybe<Array<Scalars['String']>>;
  text_not_starts_with?: InputMaybe<Scalars['String']>;
  text_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  text_starts_with?: InputMaybe<Scalars['String']>;
  text_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Right_OrderBy {
  Hypercerts = 'hypercerts',
  Id = 'id',
  Text = 'text'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  contributor?: Maybe<Contributor>;
  contributors: Array<Contributor>;
  hypercert?: Maybe<Hypercert>;
  hypercertFraction?: Maybe<HypercertFraction>;
  hypercertFractions: Array<HypercertFraction>;
  hypercerts: Array<Hypercert>;
  impactScope?: Maybe<ImpactScope>;
  impactScopes: Array<ImpactScope>;
  owner?: Maybe<Owner>;
  owners: Array<Owner>;
  right?: Maybe<Right>;
  rights: Array<Right>;
  workScope?: Maybe<WorkScope>;
  workScopes: Array<WorkScope>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionContributorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContributorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contributor_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contributor_Filter>;
};


export type SubscriptionHypercertArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHypercertFractionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHypercertFractionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HypercertFraction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HypercertFraction_Filter>;
};


export type SubscriptionHypercertsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hypercert_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Hypercert_Filter>;
};


export type SubscriptionImpactScopeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionImpactScopesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ImpactScope_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ImpactScope_Filter>;
};


export type SubscriptionOwnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOwnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Owner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Owner_Filter>;
};


export type SubscriptionRightArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRightsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Right_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Right_Filter>;
};


export type SubscriptionWorkScopeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWorkScopesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkScope_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WorkScope_Filter>;
};

export type WorkScope = {
  __typename?: 'WorkScope';
  /** array of hypercerts claiming this type of work */
  hypercerts: Array<Hypercert>;
  /** impaceScope ID maps to bytes32 input of 'workScopes' on Hypercert Minter */
  id: Scalars['ID'];
  /** natural language description of work scope */
  text: Scalars['String'];
};


export type WorkScopeHypercertsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Hypercert_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Hypercert_Filter>;
};

export type WorkScope_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  hypercerts_?: InputMaybe<Hypercert_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  text?: InputMaybe<Scalars['String']>;
  text_contains?: InputMaybe<Scalars['String']>;
  text_contains_nocase?: InputMaybe<Scalars['String']>;
  text_ends_with?: InputMaybe<Scalars['String']>;
  text_ends_with_nocase?: InputMaybe<Scalars['String']>;
  text_gt?: InputMaybe<Scalars['String']>;
  text_gte?: InputMaybe<Scalars['String']>;
  text_in?: InputMaybe<Array<Scalars['String']>>;
  text_lt?: InputMaybe<Scalars['String']>;
  text_lte?: InputMaybe<Scalars['String']>;
  text_not?: InputMaybe<Scalars['String']>;
  text_not_contains?: InputMaybe<Scalars['String']>;
  text_not_contains_nocase?: InputMaybe<Scalars['String']>;
  text_not_ends_with?: InputMaybe<Scalars['String']>;
  text_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  text_not_in?: InputMaybe<Array<Scalars['String']>>;
  text_not_starts_with?: InputMaybe<Scalars['String']>;
  text_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  text_starts_with?: InputMaybe<Scalars['String']>;
  text_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum WorkScope_OrderBy {
  Hypercerts = 'hypercerts',
  Id = 'id',
  Text = 'text'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetFractionByIdQueryVariables = Exact<{
  fractionId: Scalars['ID'];
}>;


export type GetFractionByIdQuery = { __typename?: 'Query', hypercertFraction?: { __typename?: 'HypercertFraction', id: string, units: any, hypercert: { __typename?: 'Hypercert', id: string, totalUnits: any } } | null };

export type ListFractionsForUsersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ListFractionsForUsersQuery = { __typename?: 'Query', hypercertFractions: Array<{ __typename?: 'HypercertFraction', id: string, units: any, owner: { __typename?: 'Owner', id: string }, hypercert: { __typename?: 'Hypercert', id: string, totalUnits: any, lastUpdated: any } }> };

export type GetAllHypercertsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllHypercertsQuery = { __typename?: 'Query', hypercerts: Array<{ __typename?: 'Hypercert', id: string, claimHash: any, minter: string, uri: string, contributors: Array<{ __typename?: 'Contributor', id: string }> }> };

export type GetImpactScopesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetImpactScopesQuery = { __typename?: 'Query', impactScopes: Array<{ __typename?: 'ImpactScope', id: string, text: string }> };

export type GetRightsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRightsQuery = { __typename?: 'Query', rights: Array<{ __typename?: 'Right', id: string, text: string }> };

export type GetWorkScopesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkScopesQuery = { __typename?: 'Query', workScopes: Array<{ __typename?: 'WorkScope', id: string, text: string }> };

export type GetHypercertByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetHypercertByIdQuery = { __typename?: 'Query', hypercert?: { __typename?: 'Hypercert', id: string, claimHash: any, totalUnits: any, minter: string, uri: string, impactDateFrom: any, impactDateTo: any, workDateFrom: any, workDateTo: any, rights?: Array<{ __typename?: 'Right', id: string, text: string }> | null, impactScopes?: Array<{ __typename?: 'ImpactScope', id: string, text: string }> | null, workScopes?: Array<{ __typename?: 'WorkScope', id: string, text: string }> | null, contributors: Array<{ __typename?: 'Contributor', id: string }> } | null };

export type GetHypercertFractionsQueryVariables = Exact<{
  hypercertId: Scalars['String'];
}>;


export type GetHypercertFractionsQuery = { __typename?: 'Query', hypercertFractions: Array<{ __typename?: 'HypercertFraction', id: string, units: any, hypercert: { __typename?: 'Hypercert', id: string, totalUnits: any }, owner: { __typename?: 'Owner', id: string } }> };


export const GetFractionByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFractionById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fractionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hypercertFraction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fractionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"units"}},{"kind":"Field","name":{"kind":"Name","value":"hypercert"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnits"}}]}}]}}]}}]} as unknown as DocumentNode<GetFractionByIdQuery, GetFractionByIdQueryVariables>;
export const ListFractionsForUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFractionsForUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hypercertFractions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"owner"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"units"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hypercert"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnits"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}}]}}]}}]}}]} as unknown as DocumentNode<ListFractionsForUsersQuery, ListFractionsForUsersQueryVariables>;
export const GetAllHypercertsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllHypercerts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hypercerts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"claimHash"}},{"kind":"Field","name":{"kind":"Name","value":"minter"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllHypercertsQuery, GetAllHypercertsQueryVariables>;
export const GetImpactScopesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getImpactScopes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"impactScopes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<GetImpactScopesQuery, GetImpactScopesQueryVariables>;
export const GetRightsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRights"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rights"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<GetRightsQuery, GetRightsQueryVariables>;
export const GetWorkScopesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorkScopes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workScopes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<GetWorkScopesQuery, GetWorkScopesQueryVariables>;
export const GetHypercertByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHypercertById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hypercert"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"claimHash"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnits"}},{"kind":"Field","name":{"kind":"Name","value":"minter"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}},{"kind":"Field","name":{"kind":"Name","value":"rights"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"impactDateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"impactDateTo"}},{"kind":"Field","name":{"kind":"Name","value":"impactScopes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workDateFrom"}},{"kind":"Field","name":{"kind":"Name","value":"workDateTo"}},{"kind":"Field","name":{"kind":"Name","value":"workScopes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetHypercertByIdQuery, GetHypercertByIdQueryVariables>;
export const GetHypercertFractionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHypercertFractions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hypercertId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hypercertFractions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"hypercert"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hypercertId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hypercert"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnits"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"units"}}]}}]}}]} as unknown as DocumentNode<GetHypercertFractionsQuery, GetHypercertFractionsQueryVariables>;