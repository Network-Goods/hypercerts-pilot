import { firstClaims } from "@network-goods/hypercerts-sdk";
import { useQuery } from "@apollo/client";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { graphql } from "../gql";

export type QueryResult<T> = {
  data: T;
};

export interface Claim {
  id: string;
  owner: string;
  totalUnits: string;
  uri: string;
  contract: string;
  creator: string;
}

export const useListFirstClaims = () => {
  return useReactQuery(["firstClaims"], () => firstClaims(10));
};

export const useGetAllHypercertsMintedBy = (address: string) => {
  const GET_ALL_HYPERCERTS_MINTED_BY_QUERY = graphql(`
    query GetAllHypercertsMintedBy($minter: String!) {
      hypercerts(where: { minter: $minter }) {
        id
        minter
        lastUpdated
        fractions {
          id
          owner {
            id
          }
        }
      }
    }
  `);

  return useQuery(GET_ALL_HYPERCERTS_MINTED_BY_QUERY, {
    variables: {
      minter: address.toLowerCase(),
    },
  });
};
