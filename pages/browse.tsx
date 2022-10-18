import {
  Container,
  Flex,
  ScaleFade,
  Select,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { HypercertTile } from "../components/HypercertTile";
import { useEffect, useState } from "react";
import _ from "lodash";
import Link from "next/link";
import { useCollections } from "../hooks/listCollections";
import { useListAllHypercerts } from "../hooks/listHypercerts";
import { Hypercert } from "../hooks/useHypercert";

const BrowsePage = () => {
  const { data: hypercertsResult, loading: loadingHypercerts } =
    useListAllHypercerts();
  const [filteredHypercerts, setFilteredHypercerts] = useState<Hypercert[]>([]);
  const { fetching: fetchingCollections, result: collections } =
    useCollections();

  useEffect(() => {
    if (hypercertsResult) {
      setFilteredHypercerts(hypercertsResult.hypercerts);
    }
  }, [loadingHypercerts]);

  const onChangeCollectionFilter = (collectionId: string) => {
    if (!hypercertsResult) {
      return;
    }
    if (!collections || collectionId === "all") {
      setFilteredHypercerts(hypercertsResult.hypercerts);
    } else {
      const filteredIds = _.intersection(
        hypercertsResult.hypercerts.map((x) => x.id),
        collections[collectionId]
      );
      setFilteredHypercerts(
        hypercertsResult.hypercerts.filter((x) => filteredIds.includes(x.id))
      );
    }
  };

  return (
    <Container maxWidth={800}>
      <Flex alignItems="center" mb={8}>
        <Select
          onChange={(e) => onChangeCollectionFilter(e.target.value)}
          maxWidth={300}
          disabled={fetchingCollections}
        >
          <option defaultChecked value="all">
            No collection filter
          </option>
          {collections &&
            Object.keys(collections).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
        </Select>
        {fetchingCollections && <Spinner ml={4} />}
      </Flex>
      <SimpleGrid columns={{ sm: 2, md: 2 }} spacing={8}>
        {filteredHypercerts.map((cert) => (
          <Link key={cert.id} href={`hypercerts/${cert.id}`}>
            <ScaleFade initialScale={0.9} in>
              <HypercertTile {...cert} />
            </ScaleFade>
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default BrowsePage;