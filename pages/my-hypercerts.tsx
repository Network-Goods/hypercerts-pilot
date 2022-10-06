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
import { TokenTile } from "../components/TokenTile";
import { myHypercertsContent } from "../content/my-hypercerts-content";
import { ethers } from "ethers";

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

  const fractions = data.hypercertFractions.filter(
    (f) => f.owner.id !== ethers.constants.AddressZero
  );
  const burnedFractions = data.hypercertFractions.filter(
    (f) => f.owner.id === ethers.constants.AddressZero
  );

  return (
    <Container maxWidth={1000}>
      {!fractions.length && !burnedFractions.length && (
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>{myHypercertsContent.noHypercertsOwned}</AlertTitle>
        </Alert>
      )}
      {!!fractions.length && (
        <>
          <Heading mb={4}>{myHypercertsContent.myHypercertsHeader}</Heading>
          <SimpleGrid columns={[2, 2, 3]} spacing={4}>
            {fractions.map((f) => (
              <TokenTile key={f.id} id={f.id} />
            ))}
          </SimpleGrid>
        </>
      )}
      {!!burnedFractions.length && (
        <>
          <Heading my={4}>{myHypercertsContent.burnedHypercertsHeader}</Heading>
          <Text>{myHypercertsContent.burnedHypercertsText}</Text>
          <SimpleGrid columns={[2, 2, 3]} spacing={4}>
            {burnedFractions.map((f) => (
              <TokenTile key={f.id} id={f.id} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default MyHypercertsPageWrapper;
