import { gql, useQuery } from "@apollo/client";

export const useHyperCertById = (id: string) => {
  return useQuery<{ id: string; contributors?: { id: string }[] }>(
    gql`
      query GetHypercertById($id: ID!) {
        hypercert(id: $id) {
          id
          totalUnits
          contributors {
            id
          }
        }
      }
    `,
    {
      variables: {
        id,
      },
    }
  );
};

export const useHypercertFractions = (id: string) => {
  return useQuery<{
    hypercertFractions: { id: string; owner: { id: string }; units: number }[];
  }>(
    gql`
      query GetHypercertFractions($hypercertId: String!) {
        hypercertFractions(where: { hypercert: $hypercertId }) {
          id
          owner {
            id
          }
          units
        }
      }
    `,
    {
      variables: {
        hypercertId: id,
      },
    }
  );
};
