import { Flex } from "@chakra-ui/react";
import { DEFAULT_CHAIN_ID } from "../../constants";
import { useNetwork } from "wagmi";

export const WrongNetworkBanner = () => {
  const { chain, chains } = useNetwork();
  const chainId = chain?.id?.toString();

  const isWrongNetwork = chainId !== DEFAULT_CHAIN_ID;
  const desiredNetwork = chains.find(
    (c) => c.id.toString() === DEFAULT_CHAIN_ID
  );

  if (!chainId || !isWrongNetwork) {
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
      <>
        Seems like you are on the wrong network.
        <br />
        Please switch to {desiredNetwork} to use the HyperCerts app
      </>
    </Flex>
  );
};
