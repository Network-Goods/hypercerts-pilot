import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import {
  WagmiConfig,
  createClient,
  configureChains,
  mainnet,
  goerli,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

// If using Frame provider
// @ts-ignore
import ethProvider from "eth-provider";
// If using wallet connect
import { Layout } from "../components/layout/Layout";
import Head from "next/head";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { hardhat, sepolia } from "@wagmi/chains";
import { GRAPH_ENDPOINT } from "../constants";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const apolloClient = new ApolloClient({
  uri: GRAPH_ENDPOINT,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const queryClient = new QueryClient({});

const { provider, webSocketProvider, chains } = configureChains(
  [mainnet, goerli, sepolia, hardhat],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Hypercerts Pilot",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider
          toastOptions={{
            defaultOptions: {
              position: "top-left",
            },
          }}
        >
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <Head>
                <title>HyperCert v0.2</title>
              </Head>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </RainbowKitProvider>
          </WagmiConfig>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
