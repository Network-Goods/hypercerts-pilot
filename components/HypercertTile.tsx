import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import { Hypercert } from "../pages/browse";

export const HypercertTile = ({
  name,
  contributors,
  image,
  fractions,
}: Hypercert) => {
  return (
    <Flex
      width="100%"
      justifyContent="center"
      alignItems="center"
      paddingX={8}
      paddingY={6}
      backgroundImage="url('hypercerts_tile_background.png')"
      border="1px solid black"
      maxWidth="300px"
    >
      <Flex
        width="100%"
        flexDirection="column"
        backgroundColor="lightblue"
        padding={4}
        rounded={4}
      >
        <Heading size="md">{name}</Heading>
        <Text as="b">{contributors.join(", ")}</Text>
        <Flex mt={4}>
          <Avatar src={image} mr={2} />
          <Flex flexDirection="column">
            {fractions.map((fraction) => (
              <Text key={fraction.ownerId} fontSize="sm">
                {fraction.percentage}% {fraction.owner}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
