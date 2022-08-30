import React from "react";
import { formatAddress, useWallet } from "@raidguild/quiver";
import { Button } from "@chakra-ui/react";

export const ConnectWallet = () => {
  const { connectWallet, isConnecting, isConnected, disconnect, address } =
    useWallet();
  return (
    <>
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
          <h4 style={{ display: "inline" }}>
            Connected as: {formatAddress(address)}
          </h4>
          <Button ml={3} onClick={() => disconnect()}>
            Disconnect
          </Button>
        </>
      )}
    </>
  );
};
