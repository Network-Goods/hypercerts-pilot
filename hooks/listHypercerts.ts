import { gql, useQuery } from "@apollo/client";

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
  return useQuery(GET_ALL_CERTIFICATES_QUERY);
};
