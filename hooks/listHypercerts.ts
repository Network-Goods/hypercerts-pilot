import { gql, useQuery } from "@apollo/client";
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
