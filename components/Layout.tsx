import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { Box, Center, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { ConnectWallet } from "./ConnectWallet";

const HeaderLinks = [
  { label: "Claim", href: "/claim-hypercert" },
  { label: "Burn", href: "/burn-hypercert" },
  { label: "Donate", href: "/donate-hypercert" },
];

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box position="relative">
      <Center
        backgroundColor="white"
        boxShadow="sm"
        display="flex"
        position="sticky"
        zIndex={10}
        top={0}
        as="header"
      >
        <Flex
          paddingY="20px"
          maxWidth="800px"
          width="800px"
          justifyContent="center"
        >
          <HStack justifyContent="start">
            <Text fontSize="xl">HyperCert</Text>
            <Text color="gray.400">v0.1</Text>
            <HStack pl={5}>
              {HeaderLinks.map((headerLink) => (
                <Text key={headerLink.href} fontWeight={600}>
                  <Link href={headerLink.href}>{headerLink.label}</Link>
                </Text>
              ))}
            </HStack>
          </HStack>
          <Box marginLeft="auto">
            <ConnectWallet />
          </Box>
        </Flex>
      </Center>
      <Container as="main">{children}</Container>
    </Box>
  );
};
