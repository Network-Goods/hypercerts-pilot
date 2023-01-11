import React from "react";
import { useAccount } from "wagmi";
import { useFractionsByOwner } from "../hooks/fractions";
import { myHypercertsContent } from "../content/my-hypercerts-content";
import { HypercertTile } from "../components/HypercertTile";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";

const MyHypercertsPageWrapper = () => {
  const { address } = useAccount();
  const { data, isLoading } = useFractionsByOwner(address?.toLowerCase() || "");

  if (isLoading || !data?.claimTokens) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Container maxWidth={1000}>
      {!data.claimTokens?.length && (
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>{myHypercertsContent.noHypercertsOwned}</AlertTitle>
        </Alert>
      )}
      {!!data.claimTokens.length && (
        <>
          <Heading mb={4}>{myHypercertsContent.myHypercertsHeader}</Heading>
          <SimpleGrid columns={[2, 2, 3]} spacing={4}>
            {data.claimTokens.map(({ id, claim: { uri } }) => (
              <HypercertTile hoverEffect key={id} id={id} uri={uri} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default MyHypercertsPageWrapper;
