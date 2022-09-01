import { Flex } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import { SUPPORTED_NETWORKS } from "../../pages/_app";
import { DEFAULT_CHAIN_ID } from "../../constants";

export const WrongNetworkBanner = () => {
  const { chainId } = useWallet();

  const isWrongNetwork = chainId !== undefined && chainId !== DEFAULT_CHAIN_ID;
  const desiredNetwork = SUPPORTED_NETWORKS[DEFAULT_CHAIN_ID]?.name;

  if (!isWrongNetwork) {
    return null;
  }

  return (
    <Flex
      backgroundColor="red"
      color="white"
      fontWeight="bold"
      justifyContent="center"
      textAlign="center"
      py={2}
    >
      Seems like you are on the wrong network.
      <br />
      Please switch to {desiredNetwork} to use the HyperCerts app
    </Flex>
  );
};
