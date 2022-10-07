import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

export const useFractionById = (tokenId: string) => {
  const GET_FRACTION_BY_ID_QUERY = graphql(`
    query GetFractionById($fractionId: ID!) {
      hypercertFraction(id: $fractionId) {
        id
        units
        hypercert {
          id
          totalUnits
        }
      }
    }
  `);

  return useQuery(GET_FRACTION_BY_ID_QUERY, {
    variables: {
      fractionId: tokenId,
    },
  });
};

export const useFractionsListForUser = (address: string) => {
  const FRACTIONS_LIST_FOR_USER_QUERY = graphql(`
    query ListFractionsForUsers($userId: String!) {
      hypercertFractions(where: { owner: $userId }) {
        id
        units
        owner {
          id
        }
        hypercert {
          id
          totalUnits
          lastUpdated
        }
      }
    }
  `);

  return useQuery(FRACTIONS_LIST_FOR_USER_QUERY, {
    variables: {
      userId: address.toLowerCase(),
    },
  });
};
