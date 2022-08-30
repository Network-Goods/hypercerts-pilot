import { useEffect, useState } from "react";
import { MetaData } from "../types/MetaData";

export const useIpfsMetadata = (uri: string) => {
  const [data, setData] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data || loading) return;
    const gatewayUri = uri.replace("ipfs://", "https://nftstorage.link/ipfs/");
    const fetchData = () => setLoading(true);
    fetch(gatewayUri)
      .then(async (result) => {
        setLoading(false);
        setData((await result.json()) as MetaData);
      })
      .catch((e) => {
        setLoading(false);
        throw e;
      });
    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};
