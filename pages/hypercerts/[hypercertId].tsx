import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useHyperCertById } from "../../hooks/useHypercert";
import { HypercertTile } from "../../components/HypercertTile";
import { useWallet } from "@raidguild/quiver";
import { formatContributors } from "../../utils/formatting";

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
  const hypercert = useHyperCertById(hypercertId);
  const { address } = useWallet();

  if (!hypercert) return <Alert status="error">No hypercert id provided</Alert>;

  const ownsFractions = hypercert.fractions.some(
    (fraction) => fraction.ownerId === address
  );

  const ownedFractions = hypercert.fractions.filter(
    (fraction) => fraction.ownerId === address
  );
  const otherFractions = hypercert.fractions.filter(
    (fraction) => fraction.ownerId !== address
  );

  return (
    <>
      <Flex flexDirection="column">
        <Box mb={6}>
          <Heading mb={2}>{hypercert.name}</Heading>
          <Center>
            <HypercertTile {...hypercert} />
          </Center>
        </Box>

        <Box mb={6}>
          <Heading mb={2}>Description</Heading>
          <Text>
            Abstract of the Paper Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.  About TU
            München Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet.
          </Text>
        </Box>

        <Box mb={6}>
          <Heading mb={2}>Contributors</Heading>
          {formatContributors(hypercert.contributors)}
        </Box>

        <Box mb={6}>
          <Heading mb={2}>Owners</Heading>
          <UnorderedList ml={0} spacing={4}>
            {ownedFractions.map((fraction) => (
              <FractionLine
                key={fraction.ownerId}
                address={address}
                fraction={fraction}
              />
            ))}
            {otherFractions.map((fraction) => (
              <FractionLine
                key={fraction.ownerId}
                address={address}
                fraction={fraction}
              />
            ))}
          </UnorderedList>
          {ownsFractions && <Button>Merge all my fractions</Button>}
        </Box>
      </Flex>
    </>
  );
};

const FractionLine = ({
  fraction,
  address,
}: {
  address?: string | null;
  fraction: { owner: string; ownerId: string; percentage: number };
}) => {
  return (
    <ListItem display="flex" alignItems="center">
      <Flex flexDirection="column">
        <Text fontSize="xs" opacity={0.7}>
          {fraction.percentage}%
        </Text>
        <Text fontSize="md">{fraction.owner}</Text>
      </Flex>
      <Button ml="auto">Show on OpenSea</Button>
      {fraction.ownerId === address && <Button ml={4}>Split</Button>}
    </ListItem>
  );
};

export default HypercertPageWrapper;
