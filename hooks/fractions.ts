import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

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
        }
      }
    }
  `);

  return useQuery<{
    hypercertFractions: {
      id: string;
      units: number;
      owner: {
        id: string;
      }[];
      hypercert: {
        id: string;
        totalUnits: number;
      };
    }[];
  }>(FRACTIONS_LIST_FOR_USER_QUERY, {
    variables: {
      userId: address.toLowerCase(),
    },
  });
};
