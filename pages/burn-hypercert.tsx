import React from "react";
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
} from "@chakra-ui/react";
import { useBurnHypercert } from "../hooks/burn";
import { formatIpfsUrlToGateway, useIpfsMetadata } from "../hooks/ipfs";

const GET_MY_CERTIFICATES_QUERY = gql`
  query GetMyCertificates($ownerId: String!) {
    hypercerts(where: { owner: $ownerId }) {
      id
      claimHash
      owner
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
      <Alert status="warning">Connect wallet before viewing certificates</Alert>
    );
  }

  return <Content address={address} />;
};

const Content = ({ address }: { address: string }) => {
  const { data, loading } = useQuery<{
    hypercerts: {
      id: string;
      claimHash: string;
      owner: string;
      uri: string;
      contributors: { id: string }[];
    }[];
  }>(GET_MY_CERTIFICATES_QUERY, {
    variables: {
      ownerId: address?.toLowerCase()!,
    },
    pollInterval: 3000,
  });

  const burnCertificate = useBurnHypercert();

  if (loading) {
    return (
      <Center my={3}>
        <Spinner />
      </Center>
    );
  }

  if (!data?.hypercerts.length) {
    return <Alert status="error">No certificates found</Alert>;
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

  if (!data) return <Alert status="error">Ipfs data could not be found</Alert>;

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
        Burn
      </Button>
    </Flex>
  );
};

export default BurnCertificatePageWrapper;
