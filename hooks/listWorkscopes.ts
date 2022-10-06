import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const WORK_SCOPES_QUERY = graphql(`
  query GetWorkScopes {
    workScopes {
      id
      text
    }
  }
`);

export const useWorkScopes = () => {
  return useQuery(WORK_SCOPES_QUERY);
};
