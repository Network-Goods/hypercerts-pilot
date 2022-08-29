import type { NextPage } from "next";
import { Button, Text } from "@chakra-ui/react";
import {
  formatAddress,
  useReadContract,
  useTypedContract,
  useWallet,
  useWriteContract,
} from "@raidguild/quiver";
import { HypercertMinterV0__factory } from "../contract-types";
import { toUtf8Bytes } from "ethers/lib/utils";

const TestPage: NextPage = () => {
  const { contract } = useTypedContract(
    "0x2B811227101B6FD50c5435626AC0be371EbcD3C1",
    HypercertMinterV0__factory
  );
  const { connectWallet, isConnecting, isConnected, disconnect, address } =
    useWallet();

  const { mutate } = useWriteContract(contract, "mint", {
    onError: (e) => console.log(e),
  });
  const mint = async () => {
    await mutate(
      address!,
      1,
      1,
      toUtf8Bytes(
        "ipfs://bafkreia53j3ykwrce5qcu2ywfpulmv5ckuhlflfwhak62ecmranculbzeu"
      )
    );
  };

  const { response: balance } = useReadContract(contract, "balanceOf", [
    address!,
    1,
  ]);

  const { response: tokenUri } = useReadContract(contract, "uri", [1]);

  return (
    <div>
      <Text fontStyle="h1">Hypercerts test page</Text>
      {!isConnected && (
        <Button
          disabled={isConnecting}
          onClick={() => !isConnected && connectWallet()}
        >
          {isConnecting
            ? "Connecting..."
            : isConnected
            ? "Connected"
            : "Connect Wallet"}
        </Button>
      )}
      {isConnected && (
        <>
          <h4 style={{ display: "inline" }}>{formatAddress(address)}</h4>
          <Button onClick={() => disconnect()}>Disconnect</Button>
        </>
      )}
      <Button onClick={mint}>Mint</Button>
      <Text>{balance?.toNumber()}</Text>
      <a href={tokenUri}>{tokenUri}</a>
    </div>
  );
};

export default TestPage;
