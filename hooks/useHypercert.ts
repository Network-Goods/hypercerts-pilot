import { useQuery } from "@apollo/client";
import { getMetadata, claimById } from "@network-goods/hypercerts-sdk";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { graphql } from "../gql";

export const useHyperCertById = (id: string) =>
  useReactQuery(["graph", "claim", id], () => claimById(id));

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

export const useClaimMetadata = (cid?: string | null) =>
  useReactQuery(["ipfs", "claim", "metadata", cid], async () =>
    cid ? getMetadata(cid) : null
  );
