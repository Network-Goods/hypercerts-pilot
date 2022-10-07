import { SHEET_BEST_ENDPOINT } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

export const useCollections = () => {
  const searchParams = new URLSearchParams();
  searchParams.set("_format", "list");
  const toast = useToast();

  const url = `${SHEET_BEST_ENDPOINT}/tabs/Collections?${searchParams}`;
  return useQuery(["collections"], () => fetch(url).then((res) => res.json()), {
    cacheTime: Infinity,
    onError: () => {
      toast({
        status: "error",
        description: "Could not fetch HyperCert collections",
      });
    },
  });
};
