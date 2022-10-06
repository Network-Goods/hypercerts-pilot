import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/react";
import { ConnectWallet } from "../ConnectWallet";
import { useRouter } from "next/router";
import { FORMAT_VERSION, urls } from "../../constants";
import { WrongNetworkBanner } from "./WrongNetworkBanner";
import { useWallet } from "@raidguild/quiver";

export const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useRouter();
  const { isConnected } = useWallet();
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
            <Link href={urls.browse.href}>
              <Flex alignItems="flex-end" as="a" cursor="pointer">
                <Text fontSize="xl">HyperCert</Text>
                <Text ml={2} mb={0.5} color="gray.400">
                  v{FORMAT_VERSION}
                </Text>
              </Flex>
            </Link>
            <HStack pl={5} spacing={4}>
              {Object.values(urls).map((headerLink) => {
                if (headerLink.showOnlyWhenConnected && !isConnected) {
                  return null;
                }
                return (
                  <Text
                    key={headerLink.href}
                    fontWeight={headerLink.href === pathname ? 600 : 400}
                    color={headerLink.href === pathname ? "green" : "black"}
                  >
                    <Link href={headerLink.href}>{headerLink.label}</Link>
                  </Text>
                );
              })}
            </HStack>
          </HStack>
          <Box marginLeft="auto">
            <ConnectWallet />
          </Box>
        </Flex>
      </Center>
      <WrongNetworkBanner />
      <main style={{ marginTop: 24, marginBottom: 8 }}>{children}</main>
    </Box>
  );
};
