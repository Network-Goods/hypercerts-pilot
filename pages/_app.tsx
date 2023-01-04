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
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IProviderOptions } from "web3modal";
import { Layout } from "../components/layout/Layout";
import Head from "next/head";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { sepolia } from "@wagmi/chains";

export const SUPPORTED_NETWORKS = {
  "0x1": {
    chainId: "0x1",
    name: "Mainnet",
    symbol: "ETH",
    explorer: "https://etherscan.io",
    rpc: "https://mainnet.infura.io/v3/5cb8eeb2e5ec436aadff9da1e482adac",
  },
  "0x4": {
    chainId: "0x4",
    name: "Rinkeby",
    symbol: "ETH",
    explorer: "https://rinkeby.etherscan.io",
    rpc: "https://rinkeby.infura.io/v3/5cb8eeb2e5ec436aadff9da1e482adac",
  },
  "0x5": {
    chainId: "0x5",
    name: "Goerli testnet",
    symbol: "ETH",
    explorer: "https://goerli.etherscan.io/",
    rpc: "https://goerli.infura.io/v3/5cb8eeb2e5ec436aadff9da1e482adac",
  },
  "0x7A69": {
    chainId: "0x7A69",
    name: "Hardhat",
    symbol: "ETH",
    explorer: "http://localhost:1234",
    rpc: "http://localhost:8545",
  },
  "0x89": {
    chainId: "0x89",
    name: "Polygon",
    symbol: "MATIC",
    explorer: "https://polygonscan.com",
    rpc: "https://polygon-rpc.com/",
  },
  "0x13881": {
    chainId: "0x13881",
    name: "Mumbai Testnet",
    symbol: "MATIC",
    explorer: "https://mumbai.polygonscan.com",
    rpc: "https://matic-mumbai.chainstacklabs.com",
  },
};

const providerOptions: IProviderOptions = {
  frame: {
    package: ethProvider,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: SUPPORTED_NETWORKS["0x1"].rpc,
        4: SUPPORTED_NETWORKS["0x4"].rpc,
        5: SUPPORTED_NETWORKS["0x5"].rpc,
        31337: SUPPORTED_NETWORKS["0x7A69"].rpc,
      },
    },
  },
};

const apolloClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/bitbeckers/hypercerts-goerli",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const queryClient = new QueryClient({});

const { provider, webSocketProvider } = configureChains(
  [mainnet, goerli, sepolia],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
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
            <Head>
              <title>HyperCert v0.2</title>
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </WagmiConfig>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
