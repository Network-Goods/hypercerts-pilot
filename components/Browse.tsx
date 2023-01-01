import {
  useListAllHypercerts,
  useListFirstClaims,
} from "../hooks/listHypercerts";
import { useEffect, useState } from "react";
import { GetAllHypercertsQuery } from "../gql/graphql";
import { useCollections } from "../hooks/useCollections";
import _ from "lodash";
import {
  Container,
  Flex,
  ScaleFade,
  Select,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { HypercertTile } from "./HypercertTile";

export const BrowsePage = () => {
  const { data: hypercertsResult, loading: loadingHypercerts } =
    useListAllHypercerts();
  const x = useListFirstClaims();
  const [filteredHypercerts, setFilteredHypercerts] = useState<
    GetAllHypercertsQuery["hypercerts"]
  >([]);
  const { isLoading: loadingCollections, data: collections } = useCollections();

  // TODO: This should not be necessary anymore once hypercert entities with no fractions get removed from the graph
  const hypercertWithFractions = hypercertsResult?.hypercerts.filter(
    (h) => !!h.fractions.length
  );

  useEffect(() => {
    if (hypercertWithFractions) {
      setFilteredHypercerts(hypercertWithFractions);
    }
  }, [loadingHypercerts]);

  const onChangeCollectionFilter = (collectionId: string) => {
    if (!hypercertWithFractions) {
      return;
    }

    if (!collections || collectionId === "all") {
      setFilteredHypercerts(hypercertWithFractions);
    } else {
      const filteredIds = _.intersection(
        hypercertWithFractions.map((x) => x.id),
        collections[collectionId]
      );
      setFilteredHypercerts(
        hypercertWithFractions.filter((x) => filteredIds.includes(x.id))
      );
    }
  };

  return (
    <Container maxWidth={800}>
      <Flex alignItems="center" mb={8}>
        <Select
          onChange={(e) => onChangeCollectionFilter(e.target.value)}
          maxWidth={300}
          disabled={loadingCollections}
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
        {loadingCollections && <Spinner ml={4} />}
      </Flex>
      <SimpleGrid columns={{ sm: 2, md: 2 }} spacing={8}>
        {filteredHypercerts.map((cert) => (
          <Link key={cert.id} href={`hypercerts/${cert.id}`}>
            <ScaleFade initialScale={0.9} in>
              <HypercertTile {...cert} hoverEffect />
            </ScaleFade>
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default BrowsePage;
