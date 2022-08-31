import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { Box, Center, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { ConnectWallet } from "./ConnectWallet";
import { useRouter } from "next/router";
import { FORMAT_VERSION } from "../constants";

const headerLinks = [
  { label: "Claim", href: "/claim-hypercert" },
  { label: "Burn", href: "/burn-hypercert" },
  { label: "Donate", href: "/donate-hypercert" },
];

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useRouter();
  return (
    <Box position="relative">
      <Center
        backgroundColor="white"
        boxShadow="sm"
        display="flex"
        position="sticky"
        zIndex="sticky"
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
            <Text color="gray.400">v{FORMAT_VERSION}</Text>
            <HStack pl={5}>
              {headerLinks.map((headerLink) => (
                <Text
                  key={headerLink.href}
                  fontWeight={headerLink.href === pathname ? 600 : 400}
                  color={headerLink.href === pathname ? "green" : "black"}
                >
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
      <Container as="main" mt={4}>
        {children}
      </Container>
    </Box>
  );
};
