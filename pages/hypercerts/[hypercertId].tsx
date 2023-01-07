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
  useClaimMetadata,
  useHyperCertById,
  useHypercertFractions,
  useHypercertInfo,
} from "../../hooks/useHypercert";
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
import { MetaDataResponse } from "../../types/MetaData";
import { SplitFractionModal } from "../../components/Modals/SplitFractionModal";
import { BurnFractionModal } from "../../components/Modals/BurnFractionModal";
import { useAccount } from "wagmi";
import { Claim } from "../../hooks/listHypercerts";

const HypercertPageWrapper = () => {
  const { query, isReady } = useRouter();
  const hypercertId = query["hypercertId"];

  if (!isReady) {
    return null;
  }

  if (isReady && !hypercertId) {
    console.log("Its not here", hypercertId, isReady);
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
  const { data: hypercertData, isLoading: hypercertLoading } =
    useHyperCertById(hypercertId);
  const { data: fractions, isLoading: fractionsLoading } =
    useHypercertFractions(hypercertId);
  const { address } = useAccount();
  const { data: hypercertInfo, isLoading: hypercertInfoLoading } =
    useClaimMetadata(hypercertData?.data.claim.uri);

  if (hypercertLoading || fractionsLoading || hypercertInfoLoading) {
    return (
      <Center height="100">
        <Spinner />
        <Heading fontSize="lg" ml={4}>
          Loading HyperCert info
        </Heading>
      </Center>
    );
  }

  const hypercert = hypercertData?.data.claim;

  if (!hypercert) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Incomplete HyperCert data</AlertTitle>
      </Alert>
    );
  }
  //
  // const ownedFractions = fractions.hypercertFractions.filter(
  //   (fraction) => fraction.owner.id === address?.toLowerCase()
  // );
  // const otherFractions = fractions.hypercertFractions.filter(
  //   (fraction) => fraction.owner.id !== address?.toLowerCase()
  // );
  //
  // const showBurnButton =
  //   otherFractions.length === 0 &&
  //   ownedFractions.length === 1 &&
  //   ownedFractions[0].units === ownedFractions[0].hypercert.totalUnits &&
  //   ownedFractions[0].units !== 1;

  return (
    <>
      <Flex flexDirection="column">
        <Box mb={6}>
          <Flex alignItems="center" mb={6}>
            <Heading flexGrow={1}>{hypercertInfo?.name}</Heading>
          </Flex>
          <Center>
            <HypercertTile
              id={hypercertId}
              uri={hypercertData.data.claim.uri}
            />
          </Center>
        </Box>

        {hypercertInfo && (
          <Box mb={6}>
            <Heading mb={2}>{hypercertDetailContent.description}</Heading>
            <Text>{hypercertInfo.description}</Text>
          </Box>
        )}

        {/*{hypercertInfo && (*/}
        {/*  <Box mb={6}>*/}
        {/*    <HypercertInfoBox*/}
        {/*      ipfsData={hypercertInfo}*/}
        {/*      hypercert={hypercertData}*/}
        {/*    />*/}
        {/*  </Box>*/}
        {/*)}*/}

        {/*{ipfsData && (*/}
        {/*  <Box mb={6}>*/}
        {/*    <Heading mb={2}>{hypercertDetailContent.contributors}</Heading>*/}
        {/*    <VStack spacing={2} alignItems="flex-start">*/}
        {/*      {hypercert.contributors?.map((x) => (*/}
        {/*        <UserInfo key={x.id} nameOrAddress={x.id} />*/}
        {/*      ))}*/}
        {/*      {ipfsData.properties.contributor_names.map((x) => (*/}
        {/*        <UserInfo key={x} nameOrAddress={x} />*/}
        {/*      ))}*/}
        {/*    </VStack>*/}
        {/*  </Box>*/}
        {/*)}*/}

        {/*{!!(ownedFractions.length || otherFractions.length) && (*/}
        {/*  <Box mb={6}>*/}
        {/*    <Heading mb={2}>{hypercertDetailContent.owners}</Heading>*/}
        {/*    <UnorderedList ml={0} spacing={2}>*/}
        {/*      {ownedFractions.map((fraction) => (*/}
        {/*        <FractionLine*/}
        {/*          key={fraction.id}*/}
        {/*          ownerId={fraction.owner.id}*/}
        {/*          tokenId={fraction.id}*/}
        {/*          hypercertId={hypercertId}*/}
        {/*          percentage={formatFractionPercentage(*/}
        {/*            fraction.units,*/}
        {/*            fraction.hypercert.totalUnits*/}
        {/*          )}*/}
        {/*        />*/}
        {/*      ))}*/}
        {/*      {otherFractions.map((fraction) => (*/}
        {/*        <FractionLine*/}
        {/*          key={fraction.id}*/}
        {/*          ownerId={fraction.owner.id}*/}
        {/*          tokenId={fraction.id}*/}
        {/*          hypercertId={hypercertId}*/}
        {/*          percentage={formatFractionPercentage(*/}
        {/*            fraction.units,*/}
        {/*            fraction.hypercert.totalUnits*/}
        {/*          )}*/}
        {/*        />*/}
        {/*      ))}*/}
        {/*    </UnorderedList>*/}

        {/*    {ownedFractions.length > 1 && (*/}
        {/*      <MergeAllFractionsModal*/}
        {/*        hypercertId={hypercertId}*/}
        {/*        fractionIds={ownedFractions.map((f) => f.id)}*/}
        {/*        render={({ onClick }) => (*/}
        {/*          <Button mt={6} onClick={onClick}>*/}
        {/*            Merge all my fractions*/}
        {/*          </Button>*/}
        {/*        )}*/}
        {/*      />*/}
        {/*    )}*/}
        {/*    {showBurnButton && (*/}
        {/*      <BurnFractionModal*/}
        {/*        render={({ onClick }) => (*/}
        {/*          <Button mt={6} colorScheme="red" mr={2} onClick={onClick}>*/}
        {/*            Burn HyperCert*/}
        {/*          </Button>*/}
        {/*        )}*/}
        {/*        tokenId={ownedFractions[0].id}*/}
        {/*        hypercertId={hypercertId}*/}
        {/*      />*/}
        {/*    )}*/}
        {/*  </Box>*/}
        {/*)}*/}
      </Flex>
    </>
  );
};
//
// const HypercertInfoBox = ({
//   hypercert,
//   ipfsData,
// }: {
//   hypercert: Claim;
//   ipfsData: HypInfo;
// }) => {
//   if (!hypercert) {
//     return (
//       <Alert status="error">
//         <AlertIcon />
//         <AlertTitle>HyperCert info incomplete</AlertTitle>
//       </Alert>
//     );
//   }
//
//   return (
//     <VStack
//       spacing={4}
//       alignItems="flex-start"
//       padding={4}
//       borderRadius="sm"
//       backgroundColor="lightgoldenrodyellow"
//     >
//       <InfoBoxLine title={hypercertDetailContent.infoBox.timeOfWork}>
//         {formatTime(hypercert.workDateFrom, hypercert.workDateTo)}
//       </InfoBoxLine>
//       {hypercert.workScopes && (
//         <InfoBoxLine title={hypercertDetailContent.infoBox.scopeOfWork}>
//           {hypercert.workScopes.map((w) => w.text).join(", ")}
//         </InfoBoxLine>
//       )}
//       <InfoBoxLine title={hypercertDetailContent.infoBox.timeOfImpact}>
//         {formatTime(hypercert.impactDateFrom, hypercert.impactDateTo)}
//       </InfoBoxLine>
//       {hypercert.impactScopes && (
//         <InfoBoxLine title={hypercertDetailContent.infoBox.scopeOfImpact}>
//           {hypercert.impactScopes.map((i) => i.text).join(", ")}
//         </InfoBoxLine>
//       )}
//       {hypercert.rights && (
//         <InfoBoxLine title={hypercertDetailContent.infoBox.rights}>
//           {hypercert.rights.map((r) => r.text).join(", ")}
//         </InfoBoxLine>
//       )}
//       <InfoBoxLine title={hypercertDetailContent.infoBox.externalLink}>
//         <a
//           href={ipfsData.properties.external_url}
//           target="_blank"
//           rel="noreferrer noopener"
//         >
//           {ipfsData.properties.external_url}
//         </a>
//       </InfoBoxLine>
//     </VStack>
//   );
// };

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
  ownerId,
  percentage,
  tokenId,
  hypercertId,
}: {
  ownerId: string;
  percentage: string;
  tokenId: string;
  hypercertId: string;
}) => {
  const { address } = useAccount();
  return (
    <ListItem display="flex" alignItems="center">
      <UserInfo nameOrAddress={ownerId} />
      <Text ml={1} fontSize="sm" opacity={0.7} flexGrow={1}>
        - {percentage}
      </Text>
      {ownerId.toLowerCase() === address?.toLowerCase() && (
        <SplitFractionModal
          hypercertId={hypercertId}
          tokenId={tokenId}
          render={({ onClick }) => (
            <Button onClick={onClick} mr={2}>
              Split
            </Button>
          )}
        />
      )}
      <Button
        as="a"
        target="_blank"
        rel="noreferrer noopener"
        href={getOpenSeaFractionUrl(tokenId)}
        ml="auto"
      >
        Show on OpenSea
      </Button>
    </ListItem>
  );
};

export default HypercertPageWrapper;
