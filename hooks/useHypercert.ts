import { hypercerts } from "../constants";

export const useHyperCertById = (id: string) => {
  return hypercerts.find(x => x.id === id);
}