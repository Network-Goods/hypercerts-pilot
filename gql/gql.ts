/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n    query ListFractionsForUsers($userId: String!) {\n      hypercertFractions(where: { owner: $userId }) {\n        id\n        units\n        owner {\n          id\n        }\n        hypercert {\n          id\n          totalUnits\n        }\n      }\n    }\n  ": types.ListFractionsForUsersDocument,
    "\n  query GetAllHypercerts {\n    hypercerts {\n      id\n      claimHash\n      minter\n      uri\n      contributors {\n        id\n      }\n    }\n  }\n": types.GetAllHypercertsDocument,
    "\n  query getImpactScopes {\n    impactScopes {\n      id\n      text\n    }\n  }\n": types.GetImpactScopesDocument,
    "\n  query getRights {\n    rights {\n      id\n      text\n    }\n  }\n": types.GetRightsDocument,
    "\n  query GetWorkScopes {\n    workScopes {\n      id\n      text\n    }\n  }\n": types.GetWorkScopesDocument,
    "\n    query GetHypercertById($id: ID!) {\n      hypercert(id: $id) {\n        id\n        claimHash\n        totalUnits\n        minter\n        uri\n        contributors {\n          id\n        }\n      }\n    }\n  ": types.GetHypercertByIdDocument,
    "\n    query GetHypercertFractions($hypercertId: String!) {\n      hypercertFractions(where: { hypercert: $hypercertId }) {\n        id\n        hypercert {\n          id\n          totalUnits\n        }\n        owner {\n          id\n        }\n        units\n      }\n    }\n  ": types.GetHypercertFractionsDocument,
};

export function graphql(source: "\n    query ListFractionsForUsers($userId: String!) {\n      hypercertFractions(where: { owner: $userId }) {\n        id\n        units\n        owner {\n          id\n        }\n        hypercert {\n          id\n          totalUnits\n        }\n      }\n    }\n  "): (typeof documents)["\n    query ListFractionsForUsers($userId: String!) {\n      hypercertFractions(where: { owner: $userId }) {\n        id\n        units\n        owner {\n          id\n        }\n        hypercert {\n          id\n          totalUnits\n        }\n      }\n    }\n  "];
export function graphql(source: "\n  query GetAllHypercerts {\n    hypercerts {\n      id\n      claimHash\n      minter\n      uri\n      contributors {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllHypercerts {\n    hypercerts {\n      id\n      claimHash\n      minter\n      uri\n      contributors {\n        id\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query getImpactScopes {\n    impactScopes {\n      id\n      text\n    }\n  }\n"): (typeof documents)["\n  query getImpactScopes {\n    impactScopes {\n      id\n      text\n    }\n  }\n"];
export function graphql(source: "\n  query getRights {\n    rights {\n      id\n      text\n    }\n  }\n"): (typeof documents)["\n  query getRights {\n    rights {\n      id\n      text\n    }\n  }\n"];
export function graphql(source: "\n  query GetWorkScopes {\n    workScopes {\n      id\n      text\n    }\n  }\n"): (typeof documents)["\n  query GetWorkScopes {\n    workScopes {\n      id\n      text\n    }\n  }\n"];
export function graphql(source: "\n    query GetHypercertById($id: ID!) {\n      hypercert(id: $id) {\n        id\n        claimHash\n        totalUnits\n        minter\n        uri\n        contributors {\n          id\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetHypercertById($id: ID!) {\n      hypercert(id: $id) {\n        id\n        claimHash\n        totalUnits\n        minter\n        uri\n        contributors {\n          id\n        }\n      }\n    }\n  "];
export function graphql(source: "\n    query GetHypercertFractions($hypercertId: String!) {\n      hypercertFractions(where: { hypercert: $hypercertId }) {\n        id\n        hypercert {\n          id\n          totalUnits\n        }\n        owner {\n          id\n        }\n        units\n      }\n    }\n  "): (typeof documents)["\n    query GetHypercertFractions($hypercertId: String!) {\n      hypercertFractions(where: { hypercert: $hypercertId }) {\n        id\n        hypercert {\n          id\n          totalUnits\n        }\n        owner {\n          id\n        }\n        units\n      }\n    }\n  "];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;