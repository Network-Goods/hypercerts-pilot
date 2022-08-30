import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useWallet } from "@raidguild/quiver";
import { Alert, Button, Center, Flex, Spinner, VStack } from "@chakra-ui/react";
import { useBurnHypercert } from "../hooks/burn";
import { useIpfsMetadata } from "../hooks/ipfs";

const GET_MY_CERTIFICATES_QUERY = gql`
  query GetMyCertificates($contributorId: ID!) {
    contributor(id: $contributorId) {
      hypercerts {
        id
        uri
      }
    }

    hypercertBalances(
      where: { id: "0x59266d85d94666d037c1e32daa8fac9e95cdafef" }
    ) {
      id
      amount
      token {
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
    contributor: { hypercerts: { id: string; uri: string }[] };
  }>(GET_MY_CERTIFICATES_QUERY, {
    variables: {
      contributorId: address?.toLowerCase()!,
    },
  });

  const burnCertificate = useBurnHypercert();
  if (loading) {
    return (
      <Center my={3}>
        <Spinner />
      </Center>
    );
  }

  if (!data) {
    return <Alert status="error">No certificates found</Alert>;
  }

  console.log(data);

  return (
    <>
      <VStack width="100%" py={3}>
        {data.contributor.hypercerts.map((x) => (
          <HypercertListItem
            key={x.id}
            id={x.id}
            url={x.uri}
            burn={(amount) => burnCertificate(x.id, amount)}
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
  console.log("rendering");
  const { data, loading } = useIpfsMetadata(url);
  if (loading) return <Spinner />;

  if (!data) return <Alert status="error">Ipfs data could not be found</Alert>;

  return (
    <Flex
      width="100%"
      px={4}
      py={4}
      boxShadow="md"
      borderRadius="sm"
      alignItems="center"
    >
      {data.name}
      <Button colorScheme="red" ml="auto" onClick={() => burn("1")}>
        Burn
      </Button>
    </Flex>
  );
};

export default BurnCertificatePageWrapper;
