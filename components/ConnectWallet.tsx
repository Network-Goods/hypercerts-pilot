import React from "react";
import { Button } from "@chakra-ui/react";
import { connectButtonLabels } from "../content/layout";
import { useRouter } from "next/router";
import { urls } from "../constants";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "@wagmi/connectors/injected";

export const ConnectWallet = () => {
  const { push } = useRouter();
  const { address, isConnected, isConnecting, status } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const onClickDisconnect = async () => {
    disconnect();
    await push(urls.browse.href);
  };
  return (
    <>
      {!isConnected && (
        <Button
          disabled={isConnecting}
          onClick={() => !isConnected && connect()}
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
          {connectButtonLabels.disconnect(address as string)}
        </Button>
      )}
    </>
  );
};

export default ConnectWallet;
