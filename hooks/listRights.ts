import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const RIGHTS_QUERY = graphql(`
  query getRights {
    rights {
      id
      text
    }
  }
`);

export const useRights = () => {
  return useQuery(RIGHTS_QUERY);
};
