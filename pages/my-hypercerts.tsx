import { useWallet } from "@raidguild/quiver";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useFractionsListForUser } from "../hooks/fractions";
import { myHypercertsContent } from "../content/my-hypercerts-content";
import { ethers } from "ethers";
import _ from "lodash";
import { HypercertTile } from "../components/HypercertTile";

const MyHypercertsPageWrapper = () => {
  const { address } = useWallet();

  if (!address) {
    return (
      <Container>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>No address specified</AlertTitle>
        </Alert>
      </Container>
    );
  }

  return <MyHypercertsPage userAddress={address} />;
};

const MyHypercertsPage = ({ userAddress }: { userAddress: string }) => {
  const { data, loading } = useFractionsListForUser(userAddress);

  if (loading || !data) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const fractions = data.hypercertFractions
    .filter((f) => f.owner.id !== ethers.constants.AddressZero)
    .map((fraction) => ({
      hypercertId: fraction.hypercert.id,
      lastUpdated: fraction.hypercert.lastUpdated,
    }));
  const burnedFractions = data.hypercertFractions
    .filter((f) => f.owner.id === ethers.constants.AddressZero)
    .map((fraction) => ({
      hypercertId: fraction.hypercert.id,
      lastUpdated: fraction.hypercert.lastUpdated,
    }));

  const processFractions = (xs: { hypercertId: string; lastUpdated: any }[]) =>
    _.chain(xs)
      .sortBy((x) => x.lastUpdated)
      .reverse()
      .map((x) => x.hypercertId)
      .uniq()
      .value();

  const uniqIds = processFractions(fractions);
  const uniqBurnedIds = processFractions(burnedFractions);

  return (
    <Container maxWidth={1000}>
      {!fractions.length && !burnedFractions.length && (
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>{myHypercertsContent.noHypercertsOwned}</AlertTitle>
        </Alert>
      )}
      {!!uniqIds.length && (
        <>
          <Heading mb={4}>{myHypercertsContent.myHypercertsHeader}</Heading>
          <SimpleGrid columns={[2, 2, 3]} spacing={4}>
            {uniqIds.map((id) => (
              <HypercertTile hoverEffect key={id} id={id} />
            ))}
          </SimpleGrid>
        </>
      )}
      {!!uniqBurnedIds.length && (
        <>
          <Heading my={4}>{myHypercertsContent.burnedHypercertsHeader}</Heading>
          <Text>{myHypercertsContent.burnedHypercertsText}</Text>
          <SimpleGrid columns={[2, 2, 3]} spacing={4}>
            {uniqBurnedIds.map((id) => (
              <HypercertTile hoverEffect key={id} id={id} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default MyHypercertsPageWrapper;
