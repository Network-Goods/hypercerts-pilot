import { useQuery } from "@apollo/client";
import {
  getMetadata,
  claimById,
  fractionsByClaim,
} from "@network-goods/hypercerts-sdk";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import { graphql } from "../gql";
import { Claim, QueryResult } from "./listHypercerts";

export const useHyperCertById = (id: string) =>
  useReactQuery(
    ["graph", "claim", id],
    () => claimById(id) as unknown as QueryResult<{ claim: Claim }>
  );

export const useHypercertFractions = (claimId: string) =>
  useReactQuery(["graph", "hypercert", "fractions", claimId], () =>
    fractionsByClaim(claimId)
  );
//
// export const useHypercertFractions = (id: string) => {
//   const query = graphql(`
//     query GetHypercertFractions($hypercertId: String!) {
//       hypercertFractions(where: { hypercert: $hypercertId }) {
//         id
//         hypercert {
//           id
//           totalUnits
//         }
//         owner {
//           id
//         }
//         units
//       }
//     }
//   `);
//   return useQuery(query, {
//     variables: {
//       hypercertId: id.toLowerCase(),
//     },
//   });
// };

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

export const useClaimMetadata = (cid?: string) =>
  useReactQuery(["claim", "metadata", cid], async () =>
    cid ? getMetadata(cid) : null
  );
