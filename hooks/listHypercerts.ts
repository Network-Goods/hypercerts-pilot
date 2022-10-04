import { gql, useQuery } from "@apollo/client";
import { Hypercert } from "./useHypercert";

const GET_ALL_CERTIFICATES_QUERY = gql`
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
`;
export const useListAllHypercerts = () => {
  return useQuery<{
    hypercerts: Hypercert[];
  }>(GET_ALL_CERTIFICATES_QUERY);
};
