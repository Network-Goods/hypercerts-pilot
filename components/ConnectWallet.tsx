import React from "react";
import { formatAddress, useWallet } from "@raidguild/quiver";
import { Button } from "@chakra-ui/react";
import { connectButtonLabels } from "../content/layout";

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
            ? connectButtonLabels.connecting
            : isConnected
            ? connectButtonLabels.connected
            : connectButtonLabels.connect}
        </Button>
      )}
      {isConnected && (
        <>
          <h4 style={{ display: "inline" }}>
            {connectButtonLabels.connectedAs(formatAddress(address))}
          </h4>
          <Button ml={3} onClick={() => disconnect()}>
            {connectButtonLabels.disconnect}
          </Button>
        </>
      )}
    </>
  );
};
