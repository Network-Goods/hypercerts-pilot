import React from "react";
import { formatAddress, useWallet } from "@raidguild/quiver";
import { Button } from "@chakra-ui/react";
import { connectButtonLabels } from "../content/layout";
import { useRouter } from "next/router";
import { urls } from "../constants";

export const ConnectWallet = () => {
  const { push } = useRouter();
  const { connectWallet, isConnecting, isConnected, disconnect, address } =
    useWallet();
  const onClickDisconnect = async () => {
    disconnect();
    await push(urls.browse.href);
  };
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
        <Button ml={3} onClick={onClickDisconnect}>
          {connectButtonLabels.disconnect(formatAddress(address))}
        </Button>
      )}
    </>
  );
};
