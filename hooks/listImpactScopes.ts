import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const IMPACT_SCOPES_QUERY = graphql(`
  query getImpactScopes {
    impactScopes {
      id
      text
    }
  }
`);

export const useImpactScopes = () => {
  return useQuery(IMPACT_SCOPES_QUERY);
};
