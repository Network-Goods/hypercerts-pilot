import {useEffect, useState} from "react";
import {SHEET_BEST_ENDPOINT} from "../constants";
import {useToast} from "@chakra-ui/react";

export const useCollections = () => {
  const toast = useToast();
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState<Record<string, string[]> | undefined>(undefined);
  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('_format', 'list');

    const url = SHEET_BEST_ENDPOINT + '?' + searchParams;

    const fetchCollections = async () => {
      try {

        setFetching(true);
        const result = await fetch(url).then(res => res.json());
        setResult(result);
      } catch (error) {
        console.error(error);
        toast({
          status: 'error',
          description: 'Could not fetch collections'
        });
      } finally {
        setFetching(false);
      }
    }
    if (!fetching) {
      fetchCollections();
    }
  }, []);

  return {
    fetching, result
  }
}