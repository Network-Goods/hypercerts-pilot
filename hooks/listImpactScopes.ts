import { gql, useQuery } from "@apollo/client";

const IMPACT_SCOPES_QUERY = gql`
  query getImpactScopes {
    impactScopes {
      id
      text
    }
  }
`;

export const useImpactScopes = () => {
  return useQuery<{ impactScopes: { id: string; text: string }[] }>(
    IMPACT_SCOPES_QUERY
  );
};
