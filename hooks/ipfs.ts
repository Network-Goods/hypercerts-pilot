import { useQuery } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { MetaDataResponse } from "../types/MetaData";

export const useIpfsMetadata = (uri?: string) => {
  const toast = useToast();
  return useQuery(
    [uri],
    () =>
      uri
        ? fetch(formatIpfsUrlToGateway(uri))
            .then(async (res) => (await res.json()) as MetaDataResponse)
            .catch(null)
        : null,
    {
      cacheTime: Infinity,
      onError: () => {
        toast({
          status: "error",
          description: "Could not fetch ipfs data",
        });
      },
    }
  );
};

export const formatIpfsUrlToGateway = (uri: string) =>
  uri.replace("ipfs://", "https://nftstorage.link/ipfs/");
