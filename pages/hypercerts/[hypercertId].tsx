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
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import {
  useHyperCertById,
  useHypercertFractions,
} from "../../hooks/useHypercert";
import { useWallet } from "@raidguild/quiver";
import { formatContributors } from "../../utils/formatting";

const HypercertPageWrapper = () => {
  const { query } = useRouter();
  const hypercertId = query["hypercertId"];
  console.log(query);

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

  if (hypercertLoading || fractionsLoading) {
    return <Spinner />;
  }

  if (!hypercert || !fractions) {
    return <Alert status="error">No hypercert id provided</Alert>;
  }

  const ownedFractions = fractions.hypercertFractions.filter(
    (fraction) => fraction.owner.id === address
  );
  const otherFractions = fractions.hypercertFractions.filter(
    (fraction) => fraction.owner.id !== address
  );

  return (
    <>
      <Flex flexDirection="column">
        <Box mb={6}>
          <Heading mb={2}>{hypercert.id}</Heading>
          <Center>{/*<HypercertTile {...hypercert} />*/}</Center>
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
          {formatContributors(
            hypercert.contributors?.map((contributor) => contributor.id) || []
          )}
        </Box>

        <Box mb={6}>
          <Heading mb={2}>Owners</Heading>
          <UnorderedList ml={0} spacing={4}>
            {ownedFractions.map((fraction) => (
              <FractionLine
                key={fraction.owner.id}
                address={address}
                ownerId={fraction.owner.id}
                percentage={fraction.units}
              />
            ))}
            {otherFractions.map((fraction) => (
              <FractionLine
                key={fraction.owner.id}
                address={address}
                ownerId={fraction.owner.id}
                percentage={fraction.units}
              />
            ))}
          </UnorderedList>
          {/*{ownsFractions && <Button>Merge all my fractions</Button>}*/}
        </Box>
      </Flex>
    </>
  );
};

const FractionLine = ({
  address,
  ownerId,
  percentage,
}: {
  address?: string | null;
  ownerId: string;
  percentage: number;
}) => {
  return (
    <ListItem display="flex" alignItems="center">
      <Flex flexDirection="column">
        <Text fontSize="xs" opacity={0.7}>
          {percentage}%
        </Text>
        <Text fontSize="md">{ownerId}</Text>
      </Flex>
      <Button ml="auto">Show on OpenSea</Button>
      {ownerId === address && <Button ml={4}>Split</Button>}
    </ListItem>
  );
};

export default HypercertPageWrapper;
