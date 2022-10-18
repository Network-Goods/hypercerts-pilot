import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const GET_ALL_CERTIFICATES_QUERY = graphql(`
  query GetAllHypercerts {
    hypercerts {
      id
      claimHash
      minter
      uri
      fractions {
        id
      }
      contributors {
        id
      }
    }
  }
`);

export const useListAllHypercerts = () => {
  return useQuery(GET_ALL_CERTIFICATES_QUERY);
};

export const useGetAllHypercertsMintedBy = (address: string) => {
  const GET_ALL_HYPERCERTS_MINTED_BY_QUERY = graphql(`
    query GetAllHypercertsMintedBy($minter: String!) {
      hypercerts(where: { minter: $minter }) {
        id
        minter
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
