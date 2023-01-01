import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FORMAT_VERSION, urls } from "../../constants";
import { WrongNetworkBanner } from "./WrongNetworkBanner";
import Image from "next/image";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";

const ConnectWallet = dynamic(() => import("../ConnectWallet"), { ssr: false });

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
            <Link href={urls.browse.href}>
              <Flex alignItems="flex-end" as="a" cursor="pointer">
                <Image src="/logo.svg" width={30} height={30} />
                <Text ml={2} fontSize="xl">
                  HyperCert
                </Text>
                <Text
                  as="sup"
                  fontSize="14px"
                  color="gray.400"
                  transform="translateY(-8px)"
                  ml={1}
                >
                  <sup>v{FORMAT_VERSION}</sup>
                </Text>
              </Flex>
            </Link>
            <HStack pl={5} spacing={4}>
              {Object.values(urls).map((headerLink) => {
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
