import { firstClaims } from "@network-goods/hypercerts-sdk";
import { useQuery as useReactQuery } from "@tanstack/react-query";

export const useListFirstClaims = () => {
  return useReactQuery(["firstClaims"], () => firstClaims(10));
};
