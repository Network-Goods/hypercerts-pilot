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
  VStack,
} from "@chakra-ui/react";
import {
  useHyperCertById,
  useHypercertFractions,
  useHypercertInfo,
} from "../../hooks/useHypercert";
import { useWallet } from "@raidguild/quiver";
import {
  formatFractionPercentage,
  formatTime,
  getOpenSeaFractionUrl,
} from "../../utils/formatting";
import { HypercertTile } from "../../components/HypercertTile";
import React from "react";
import { MergeAllFractionsModal } from "../../components/Modals/MergeAllFractionsModal";
import { GetHypercertByIdQuery } from "../../gql/graphql";
import { UserInfo } from "../../components/UserInfo";
import { hypercertDetailContent } from "../../content/hypercert-detail-content";
import { useIpfsMetadata } from "../../hooks/ipfs";
import { MetaDataResponse } from "../../types/MetaData";

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
  const { data: hypercertData, loading: hypercertLoading } =
    useHyperCertById(hypercertId);
  const { data: fractions, loading: fractionsLoading } =
    useHypercertFractions(hypercertId);
  const { address } = useWallet();
  const { data: hypercertInfo, loading: hypercertInfoLoading } =
    useHypercertInfo(hypercertId);

  const { data: ipfsData, isLoading: ipfsDataLoading } = useIpfsMetadata(
    hypercertData?.hypercert?.uri
  );

  if (
    hypercertLoading ||
    fractionsLoading ||
    hypercertInfoLoading ||
    ipfsDataLoading
  ) {
    return (
      <Center height="100">
        <Spinner />
        <Heading fontSize="lg" ml={4}>
          Loading HyperCert info
        </Heading>
      </Center>
    );
  }

  const hypercert = hypercertData?.hypercert;

  if (!hypercert || !fractions || !ipfsData) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Incomplete HyperCert data</AlertTitle>
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
          <Flex alignItems="center" mb={6}>
            <Heading flexGrow={1}>{hypercertInfo?.name}</Heading>
            <Button>{hypercertDetailContent.viewHyperCertOnOpenSea}</Button>
          </Flex>
          <Center>
            <HypercertTile id={hypercertId} />
          </Center>
        </Box>

        {hypercertInfo && (
          <Box mb={6}>
            <Heading mb={2}>{hypercertDetailContent.description}</Heading>
            <Text>{hypercertInfo.description}</Text>
          </Box>
        )}

        <Box mb={6}>
          <HypercertInfoBox ipfsData={ipfsData} hypercert={hypercert} />
        </Box>

        <Box mb={6}>
          <Heading mb={2}>{hypercertDetailContent.contributors}</Heading>
          <VStack spacing={2} alignItems="flex-start">
            {hypercert.contributors?.map((x) => (
              <UserInfo key={x.id} address={x.id} />
            ))}
            {ipfsData.properties.contributor_names.map((x) => (
              <UserInfo key={x} address={x} />
            ))}
          </VStack>
        </Box>

        <Box mb={6}>
          <Heading mb={2}>{hypercertDetailContent.owners}</Heading>
          <UnorderedList ml={0} spacing={4}>
            {ownedFractions.map((fraction) => (
              <FractionLine
                key={fraction.id}
                address={address}
                ownerId={fraction.owner.id}
                tokenId={fraction.id}
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
                tokenId={fraction.id}
                percentage={formatFractionPercentage(
                  fraction.units,
                  fraction.hypercert.totalUnits
                )}
              />
            ))}
          </UnorderedList>

          {!!ownedFractions.length && (
            <MergeAllFractionsModal
              hypercertId={hypercertId}
              fractionIds={ownedFractions.map((f) => f.id)}
              render={({ onClick }) => (
                <Button mt={6} onClick={onClick}>
                  Merge all my fractions
                </Button>
              )}
            />
          )}
        </Box>
      </Flex>
    </>
  );
};

const HypercertInfoBox = ({
  hypercert,
  ipfsData,
}: {
  hypercert: GetHypercertByIdQuery["hypercert"];
  ipfsData: MetaDataResponse;
}) => {
  if (!hypercert) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>HyperCert info incomplete</AlertTitle>
      </Alert>
    );
  }

  return (
    <VStack
      spacing={4}
      alignItems="flex-start"
      padding={4}
      borderRadius="sm"
      backgroundColor="lightgoldenrodyellow"
    >
      <InfoBoxLine title={hypercertDetailContent.infoBox.timeOfWork}>
        {formatTime(hypercert.workDateFrom, hypercert.workDateTo)}
      </InfoBoxLine>
      {hypercert.workScopes && (
        <InfoBoxLine title={hypercertDetailContent.infoBox.scopeOfWork}>
          {hypercert.workScopes.map((w) => w.text).join(", ")}
        </InfoBoxLine>
      )}
      <InfoBoxLine title={hypercertDetailContent.infoBox.timeOfImpact}>
        {formatTime(hypercert.impactDateFrom, hypercert.impactDateTo)}
      </InfoBoxLine>
      {hypercert.impactScopes && (
        <InfoBoxLine title={hypercertDetailContent.infoBox.scopeOfImpact}>
          {hypercert.impactScopes.map((i) => i.text).join(", ")}
        </InfoBoxLine>
      )}
      {hypercert.rights && (
        <InfoBoxLine title={hypercertDetailContent.infoBox.rights}>
          {hypercert.rights.map((r) => r.text).join(", ")}
        </InfoBoxLine>
      )}
      <InfoBoxLine title={hypercertDetailContent.infoBox.externalLink}>
        <a
          href={ipfsData.properties.external_url}
          target="_blank"
          rel="noreferrer noopener"
        >
          {ipfsData.properties.external_url}
        </a>
      </InfoBoxLine>
    </VStack>
  );
};

const InfoBoxLine = ({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) => (
  <Box>
    <Text fontSize="small" fontWeight={500}>
      {title}
    </Text>
    <Heading fontSize="md" textOverflow="ellipsis">
      {children}
    </Heading>
  </Box>
);

const FractionLine = ({
  address,
  ownerId,
  percentage,
  tokenId,
}: {
  address?: string | null;
  ownerId: string;
  percentage: string;
  tokenId: string;
}) => {
  return (
    <ListItem display="flex" alignItems="center">
      <UserInfo address={ownerId} />
      <Text ml={1} fontSize="sm" opacity={0.7}>
        - {percentage}
      </Text>
      <Button
        as="a"
        target="_blank"
        rel="noreferrer noopener"
        href={getOpenSeaFractionUrl(tokenId)}
        ml="auto"
      >
        Show on OpenSea
      </Button>
      {ownerId === address && <Button ml={4}>Split</Button>}
    </ListItem>
  );
};

export default HypercertPageWrapper;
