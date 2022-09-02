import { gql, useQuery } from "@apollo/client";

const RIGHTS_QUERY = gql`
    query getRights {
        rights {
            id
            text
        }
    }
`;

export const useRights = () => {
  return useQuery<{ rights: { id: string; text: string }[] }>(RIGHTS_QUERY, {
    pollInterval: 5000,
  });
};
