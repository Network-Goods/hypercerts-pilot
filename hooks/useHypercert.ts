import { useQuery } from "@apollo/client";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { graphql } from "../gql";
import { getMetadata } from "../../hypercerts-sdk";

export interface Hypercert {
  id: string;
  claimHash: string;
  totalUnits: string;
  minter: string;
  uri: string;
  contributors: {
    id: string;
  }[];
}

export const useHyperCertById = (id: string) => {
  const query = graphql(`
    query GetHypercertById($id: ID!) {
      hypercert(id: $id) {
        id
        claimHash
        totalUnits
        minter
        uri
        rights {
          id
          text
        }
        impactDateFrom
        impactDateTo
        impactScopes {
          id
          text
        }
        workDateFrom
        workDateTo
        workScopes {
          id
          text
        }
        contributors {
          id
        }
      }
    }
  `);
  return useQuery(query, {
    variables: {
      id,
    },
  });
};

export const useHypercertFractions = (id: string) => {
  const query = graphql(`
    query GetHypercertFractions($hypercertId: String!) {
      hypercertFractions(where: { hypercert: $hypercertId }) {
        id
        hypercert {
          id
          totalUnits
        }
        owner {
          id
        }
        units
      }
    }
  `);
  return useQuery(query, {
    variables: {
      hypercertId: id.toLowerCase(),
    },
  });
};

interface HypercertInfo {
  name: string;
  description: string;
  image: string;
}

export const useHypercertInfo = (hypercertId: string) => {
  const GET_HYPERCERT_METADATA_QUERY = graphql(`
    query GetHypercertMetadata($hypercertId: ID!) {
      hypercert(id: $hypercertId) {
        id
        metadata
      }
    }
  `);
  const { loading, data: response } = useQuery(GET_HYPERCERT_METADATA_QUERY, {
    variables: {
      hypercertId,
    },
  });

  if (!response?.hypercert) {
    return { data: undefined, loading };
  }

  try {
    const metadata = response?.hypercert.metadata;
    const responseWithoutPrefix = metadata.replace(
      "data:application/json;base64,",
      ""
    );
    const decodedB64Json = atob(responseWithoutPrefix);
    return {
      data: JSON.parse(decodedB64Json) as HypercertInfo,
      loading,
    };
  } catch (error) {
    console.error(error);
    return { data: undefined, loading };
  }
};

export const useClaimMetadata = (cid: string) =>
  useReactQuery(["claim", "metadata", cid], () => getMetadata(cid));
