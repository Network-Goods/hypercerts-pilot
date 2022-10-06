import { useQuery } from "@apollo/client";
import { useHypercertContract } from "./contracts";
import { useReadContract } from "@raidguild/quiver";
import { graphql } from "../gql";

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
  const contract = useHypercertContract();

  const { response, loading } = useReadContract(contract, "slotURI", [
    hypercertId,
  ]);

  if (!response) {
    return { data: undefined, loading };
  }

  try {
    const responseWithoutPrefix = response.replace(
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

export const useFractionInfo = (fractionId: string) => {
  const contract = useHypercertContract();

  const { response, loading } = useReadContract(contract, "tokenURI", [
    fractionId,
  ]);

  if (!response) {
    return { data: undefined, loading };
  }

  try {
    const responseWithoutPrefix = response.replace(
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
