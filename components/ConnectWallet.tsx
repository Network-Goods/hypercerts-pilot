import React from "react";
import { connectButtonLabels } from "../content/layout";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  /**
   * TODO: Sometimes the modal wont close when react strict mode is on.
   * Shouldn't happen in production because strict mode is turned off there
   * Related to https://github.com/Network-Goods/hypercerts-protocol/issues/80
   */
  return (
    <ConnectButton
      showBalance={false}
      chainStatus="none"
      label={
        isConnected
          ? connectButtonLabels.connected
          : address
          ? connectButtonLabels.disconnect(address as string)
          : connectButtonLabels.connect
      }
    />
  );
};

export default ConnectWallet;
