import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const GET_ALL_CERTIFICATES_QUERY = graphql(`
  query GetAllCertificates {
    hypercerts {
      id
      claimHash
      minter
      uri
      contributors {
        id
      }
    }
  }
`);

export const useListAllHypercerts = () => {
  return useQuery(GET_ALL_CERTIFICATES_QUERY);
};
