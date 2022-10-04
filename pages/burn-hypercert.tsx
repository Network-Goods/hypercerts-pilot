import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useWallet } from "@raidguild/quiver";
import {
  Alert,
  Button,
  Center,
  Flex,
  Spinner,
  VStack,
  Text,
  Image,
  Container,
} from "@chakra-ui/react";
import { useBurnHypercert } from "../hooks/burn";
import { formatIpfsUrlToGateway, useIpfsMetadata } from "../hooks/ipfs";
import { errors, labels } from "../content/burn-hypercert-content";

const GET_MY_CERTIFICATES_QUERY = gql`
  query GetMyCertificates($minterId: String!) {
    hypercerts(where: { minter: $minterId }) {
      id
      claimHash
      minter
      uri
      contributors {
        id
      }
    }
  }
`;

const BurnCertificatePageWrapper = () => {
  const { address } = useWallet();

  if (!address) {
    return (
      <Container>
        <Alert status="warning">{errors.noWalletConnectedError}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Content address={address} />
    </Container>
  );
};

const Content = ({ address }: { address: string }) => {
  const { data, loading, startPolling } = useQuery<{
    hypercerts: {
      id: string;
      claimHash: string;
      minter: string;
      uri: string;
      contributors: { id: string }[];
    }[];
  }>(GET_MY_CERTIFICATES_QUERY, {
    variables: {
      minterId: address?.toLowerCase()!,
    },
  });

  useEffect(() => {
    startPolling(5000);
  }, []);

  const burnCertificate = useBurnHypercert();

  if (loading) {
    return (
      <Center my={3}>
        <Spinner />
      </Center>
    );
  }

  if (!data?.hypercerts.length) {
    return <Alert status="error">{errors.noCertificatesError}</Alert>;
  }

  return (
    <>
      <VStack width="100%" py={3}>
        {data.hypercerts.map((hypercert) => (
          <HypercertListItem
            key={hypercert.id}
            id={hypercert.id}
            url={hypercert.uri}
            burn={(amount) => burnCertificate(hypercert.id, amount)}
          />
        ))}
      </VStack>
    </>
  );
};

const HypercertListItem = ({
  url,
  burn,
}: {
  id: string;
  url: string;
  burn: (value: string) => Promise<void>;
}) => {
  const { data, loading } = useIpfsMetadata(url);

  if (loading) return <Spinner />;

  if (!data) return <Alert status="error">{errors.noIpfsDataError}</Alert>;

  return (
    <Flex
      width="100%"
      px={3}
      py={3}
      boxShadow="md"
      borderRadius="sm"
      alignItems="center"
    >
      <Image
        src={formatIpfsUrlToGateway(data.image)}
        alt="NFT token image"
        height={10}
        rounded="sm"
        mr={4}
      />
      <Text>{data.name}</Text>
      <Button colorScheme="red" ml="auto" onClick={() => burn("1")}>
        {labels.burnButtonLabel}
      </Button>
    </Flex>
  );
};

export default BurnCertificatePageWrapper;
