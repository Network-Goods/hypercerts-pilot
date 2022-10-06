import { SHEET_BEST_ENDPOINT } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

interface UserInfoFallback {
  address: string;
  name?: string;
  avatar?: string;
  website?: string;
}

export const useUserInfoFallbacks = () => {
  const searchParams = new URLSearchParams();
  const toast = useToast();

  const url = `${SHEET_BEST_ENDPOINT}/tabs/UserInfoFallbacks?${searchParams}`;
  return useQuery(
    ["user-info-fallbacks"],
    () =>
      fetch(url).then(async (res) => (await res.json()) as UserInfoFallback[]),
    {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onError: () => {
        toast({
          status: "error",
          description: "Could not fetch HyperCert collections",
        });
      },
    }
  );
};
