import { gql, useQuery } from "@apollo/client";

const WORK_SCOPES_QUERY = gql`
  query getWorkScopes {
    workScopes {
      id
      text
    }
  }
`;

export const useWorkScopes = () => {
  return useQuery<{ workScopes: { id: string; text: string }[] }>(
    WORK_SCOPES_QUERY,
    {
      pollInterval: 5000,
    }
  );
};
