import { useRouter } from "next/router";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import {
  useHyperCertById,
  useHypercertFractions,
  useHypercertInfo,
} from "../../hooks/useHypercert";
import { useWallet } from "@raidguild/quiver";
import {
  formatContributors,
  formatFractionPercentage,
} from "../../utils/formatting";
import { HypercertTile } from "../../components/HypercertTile";
import React from "react";

const HypercertPageWrapper = () => {
  const { query } = useRouter();
  const hypercertId = query["hypercertId"];

  if (!hypercertId) {
    return (
      <Container>
        <Alert status="error">No hypercert id provided</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <HypercertPage hypercertId={hypercertId as string} />
    </Container>
  );
};

const HypercertPage = ({ hypercertId }: { hypercertId: string }) => {
  const { data: hypercert, loading: hypercertLoading } =
    useHyperCertById(hypercertId);
  const { data: fractions, loading: fractionsLoading } =
    useHypercertFractions(hypercertId);
  const { address } = useWallet();
  const { data: hypercertInfo, loading: hypercertInfoLoading } =
    useHypercertInfo(hypercertId);

  if (hypercertLoading || fractionsLoading || hypercertInfoLoading) {
    return (
      <Center height="100">
        <Spinner />
        <Heading fontSize="lg" ml={4}>
          Loading hypercert info
        </Heading>
      </Center>
    );
  }

  if (!hypercert || !fractions) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Incomplete hypercert data</AlertTitle>
      </Alert>
    );
  }

  const ownedFractions = fractions.hypercertFractions.filter(
    (fraction) => fraction.owner.id === address?.toLowerCase()
  );
  const otherFractions = fractions.hypercertFractions.filter(
    (fraction) => fraction.owner.id !== address?.toLowerCase()
  );

  return (
    <>
      <Flex flexDirection="column">
        <Box mb={6}>
          <Heading mb={2}>{hypercert.id}</Heading>
          <Center>
            <HypercertTile id={hypercertId} />
          </Center>
        </Box>

        {hypercertInfo && (
          <Box mb={6}>
            <Heading mb={2}>Description</Heading>
            <Text>{hypercertInfo.description}</Text>
          </Box>
        )}

        <Box mb={6}>
          <HypercertInfoBox hypercertId={hypercertId} />
        </Box>

        <Box mb={6}>
          <Heading mb={2}>Contributors</Heading>
          {formatContributors(
            hypercert.contributors?.map((contributor) => contributor.id) || []
          )}
        </Box>

        <Box mb={6}>
          <Heading mb={2}>Owners</Heading>
          <UnorderedList ml={0} spacing={4}>
            {ownedFractions.map((fraction) => (
              <FractionLine
                key={fraction.id}
                address={address}
                ownerId={fraction.owner.id}
                percentage={formatFractionPercentage(
                  fraction.units,
                  fraction.hypercert.totalUnits
                )}
              />
            ))}
            {otherFractions.map((fraction) => (
              <FractionLine
                key={fraction.id}
                address={address}
                ownerId={fraction.owner.id}
                percentage={formatFractionPercentage(
                  fraction.units,
                  fraction.hypercert.totalUnits
                )}
              />
            ))}
          </UnorderedList>
          {ownedFractions.length > 1 && <Button>Merge all my fractions</Button>}
        </Box>
      </Flex>
    </>
  );
};

const HypercertInfoBox = ({ hypercertId }: { hypercertId: string }) => {
  const { loading, data } = useHypercertInfo(hypercertId);

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Could not load hypercert info</AlertTitle>
      </Alert>
    );
  }

  return (
    <Box>
      <Text fontSize="xs">Time of work</Text>
    </Box>
  );
};

const FractionLine = ({
  address,
  ownerId,
  percentage,
}: {
  address?: string | null;
  ownerId: string;
  percentage: string;
}) => {
  return (
    <ListItem display="flex" alignItems="center">
      <Flex flexDirection="column">
        <Text fontSize="xs" opacity={0.7}>
          {percentage}
        </Text>
        <Text fontSize="md">{ownerId}</Text>
      </Flex>
      <Button ml="auto">Show on OpenSea</Button>
      {ownerId === address && <Button ml={4}>Split</Button>}
    </ListItem>
  );
};

export default HypercertPageWrapper;
