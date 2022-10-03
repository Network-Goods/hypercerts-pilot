import { Container, Flex, ScaleFade, Select, SimpleGrid, Spinner } from "@chakra-ui/react";
import { HypercertTile } from "../components/HypercertTile";
import { useState } from "react";
import _ from "lodash";
import Link from "next/link";
import { useCollections } from "../hooks/listCollections";
import { hypercerts } from "../constants";

export interface Hypercert {
  id: string;
  name: string;
  contributors: string[];
  image: string;
  fractions: {
    ownerId: string;
    percentage: number;
    owner: string;
  }[];
}

const BrowsePage = () => {
  const [filteredHypercerts, setFilteredHypercerts] = useState(hypercerts);
  const { fetching: fetchingCollections, result: collections } = useCollections();

  const onChangeCollectionFilter = (collectionId: string) => {
    if (!collections || collectionId === "all") {
      setFilteredHypercerts(hypercerts);
    } else {
      const filteredIds = _.intersection(
        hypercerts.map((x) => x.id),
        collections[collectionId]
      );
      setFilteredHypercerts(
        hypercerts.filter((x) => filteredIds.includes(x.id))
      );
    }
  };

  return (
    <Container maxWidth={800}>
      <Flex alignItems="center"
            mb={8}>
        <Select
          onChange={(e) => onChangeCollectionFilter(e.target.value)}
          maxWidth={300}
          disabled={fetchingCollections}
        >
          <option defaultChecked value="all">
            No collection filter
          </option>
          {collections && Object.keys(collections).map((key) => (
            <option key={key} value={key}>{key}</option>
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
