import { useWallet } from "@raidguild/quiver";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Center,
  Container,
  Spinner,
} from "@chakra-ui/react";
import { useFractionsListForUser } from "../hooks/fractions";
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

  return (
    <Container>
      {data.hypercertFractions.map((f) => (
        <HypercertTile id={f.id} />
      ))}
    </Container>
  );
};

export default MyHypercertsPageWrapper;
