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
  VStack,
} from "@chakra-ui/react";
import { useFractionsListForUser } from "../hooks/fractions";
import { myHypercertsContent } from "../content/my-hypercerts-content";
import { ethers } from "ethers";
import _ from "lodash";
import { HypercertTile } from "../components/HypercertTile";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGetAllHypercertsMintedBy } from "../hooks/listHypercerts";

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
  const {
    query: { withPolling },
  } = useRouter();
  const { data, loading, startPolling, stopPolling } =
    useFractionsListForUser(userAddress);
  const {
    data: hypercertsMintedBy,
    loading: loadingHypercertsMintedBy,
    startPolling: startPollingHypercertsMintedBy,
    stopPolling: stopPollingHypercertsMintedBy,
  } = useGetAllHypercertsMintedBy(userAddress);

  useEffect(() => {
    if (withPolling) {
      startPolling(10000);
      startPollingHypercertsMintedBy(10000);
    }
    return () => {
      stopPolling();
      stopPollingHypercertsMintedBy();
    };
  }, [withPolling]);

  if (loading || loadingHypercertsMintedBy || !data || !hypercertsMintedBy) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const uniqIds = _.chain(data.hypercertFractions)
    .filter((f) => f.owner.id !== ethers.constants.AddressZero)
    .map((fraction) => ({
      hypercertId: fraction.hypercert.id,
      lastUpdated: fraction.hypercert.lastUpdated,
    }))
    .sortBy((x) => x.lastUpdated)
    .reverse()
    .map((x) => x.hypercertId)
    .uniq()
    .value();

  const uniqBurnedIds = _.chain(hypercertsMintedBy.hypercerts)
    .filter((x) => !x.fractions.length)
    .sortBy((x) => x.lastUpdated)
    .reverse()
    .map((x) => x.id)
    .value();

  return (
    <Container maxWidth={1000}>
      {!uniqIds.length && !uniqBurnedIds.length && (
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
        <VStack spacing={4} alignItems="flex-start">
          <Heading>{myHypercertsContent.burnedHypercertsHeader}</Heading>
          <Text>{myHypercertsContent.burnedHypercertsText}</Text>
          <SimpleGrid columns={[2, 2, 3]} spacing={4}>
            {uniqBurnedIds.map((id) => (
              <HypercertTile hoverEffect key={id} id={id} />
            ))}
          </SimpleGrid>
        </VStack>
      )}
    </Container>
  );
};

export default MyHypercertsPageWrapper;
