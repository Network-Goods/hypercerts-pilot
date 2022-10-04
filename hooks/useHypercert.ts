import { gql, useQuery } from "@apollo/client";
import { useHypercertContract } from "./contracts";
import { useReadContract } from "@raidguild/quiver";

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
  return useQuery<Hypercert>(
    gql`
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
    `,
    {
      variables: {
        id,
      },
    }
  );
};

interface HypercertFraction {
  id: string;
  owner: { id: string };
  hypercert: {
    id: string;
    totalUnits: string;
  };
  units: string;
}

export const useHypercertFractions = (id: string) => {
  return useQuery<{
    hypercertFractions: HypercertFraction[];
  }>(
    gql`
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
    `,
    {
      variables: {
        hypercertId: id.toLowerCase(),
      },
    }
  );
};

interface HypercertInfo {
  name: string;
  description: string;
  properties: {
    name: string;
    description: string;
    value: string;
    is_intrinsic: boolean;
  }[];
}

export const useHypercertInfo = (hypercertId: string) => {
  const contract = useHypercertContract();

  const { response, loading } = useReadContract(contract, "slotURI", [
    hypercertId,
  ]);

  if (!response) {
    return { data: undefined, loading };
  }

  const responseWithoutPrefix = response.replace("data:application/json;", "");
  try {
    return {
      data: JSON.parse(responseWithoutPrefix) as HypercertInfo,
      loading,
    };
  } catch (error) {
    console.error(error);
    return { data: undefined, loading };
  }
};
