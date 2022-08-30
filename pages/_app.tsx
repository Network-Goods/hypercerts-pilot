import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { WalletProvider, NetworkConfig } from "@raidguild/quiver";

// If using Frame provider
// @ts-ignore
import ethProvider from "eth-provider";
// If using wallet connect
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IProviderOptions } from "web3modal";
import { Layout } from "../components/Layout";
import Head from "next/head";
import { requireEnv } from "../utils/requireEnv";

const SUPPORTED_NETWORKS: NetworkConfig = {
  "0x1": {
    chainId: "0x1",
    name: "Mainnet",
    symbol: "ETH",
    explorer: "https://etherscan.io",
    rpc: "https://mainnet.infura.io/v3/<your infura project id>",
  },
  "0x4": {
    chainId: "0x4",
    name: "Rinkeby",
    symbol: "ETH",
    explorer: "https://rinkeby.etherscan.io",
    rpc: "https://rinkeby.infura.io/v3/<your infura project id>",
  },
  "0x5": {
    chainId: "0x5",
    name: "Goerli testnet",
    symbol: "ETH",
    explorer: "https://goerli.etherscan.io/",
    rpc: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
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

const web3modalOptions = {
  cacheProvider: true,
  providerOptions,
  theme: "dark",
};

const DEFAULT_CHAIN_ID = requireEnv(
  process.env.NEXT_PUBLIC_DEFAULT_CHAIN,
  "NEXT_PUBLIC_DEFAULT_CHAIN"
);

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/bitbeckers/hypercerts-goerli",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider
        toastOptions={{
          defaultOptions: {
            position: "top-left",
          },
        }}
      >
        <WalletProvider
          web3modalOptions={web3modalOptions}
          networks={SUPPORTED_NETWORKS}
          // Optional if you want to auto switch the network
          defaultChainId={DEFAULT_CHAIN_ID}
          // Optional but useful to handle events.
          handleModalEvents={(eventName, error) => {
            console.error(error);
            console.log(eventName);
          }}
        >
          <Head>
            <title>HyperCert v0.1</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WalletProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
