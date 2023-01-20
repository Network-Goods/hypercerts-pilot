import { useListFirstClaims } from "../hooks/listHypercerts";
import React, { useEffect, useState } from "react";
import { useCollections } from "../hooks/useCollections";
import { Container, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import { HypercertTile } from "./HypercertTile";

export const BrowsePage = () => {
  const { data: hypercertsResult, isLoading: loadingHypercerts } =
    useListFirstClaims();
  const { isLoading: loadingCollections, data: collections } = useCollections();

  // const onChangeCollectionFilter = (collectionId: string) => {
  //   if (!hypercertWithFractions) {
  //     return;
  //   }
  //
  //   if (!collections || collectionId === "all") {
  //     setFilteredHypercerts(hypercertWithFractions);
  //   } else {
  //     const filteredIds = _.intersection(
  //       hypercertWithFractions.map((x) => x.id),
  //       collections[collectionId]
  //     );
  //     setFilteredHypercerts(
  //       hypercertWithFractions.filter((x) => filteredIds.includes(x.id))
  //     );
  //   }
  // };

  return (
    <Container maxWidth={800}>
      <Flex alignItems="center" mb={8}>
        {/*<Select*/}
        {/*  onChange={(e) => onChangeCollectionFilter(e.target.value)}*/}
        {/*  maxWidth={300}*/}
        {/*  disabled={loadingCollections}*/}
        {/*>*/}
        {/*  <option defaultChecked value="all">*/}
        {/*    No collection filter*/}
        {/*  </option>*/}
        {/*  {collections &&*/}
        {/*    Object.keys(collections).map((key) => (*/}
        {/*      <option key={key} value={key}>*/}
        {/*        {key}*/}
        {/*      </option>*/}
        {/*    ))}*/}
        {/*</Select>*/}
        {loadingCollections && <Spinner ml={4} />}
      </Flex>
      <SimpleGrid columns={{ sm: 2, md: 2 }} spacing={8}>
        {hypercertsResult?.claims.map((cert) => (
          <HypercertTile
            key={cert.id}
            id={cert.id}
            uri={cert.uri!}
            hoverEffect
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default BrowsePage;
