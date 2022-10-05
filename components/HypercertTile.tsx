import { Flex, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Hypercert, useHypercertInfo } from "../hooks/useHypercert";

export const HypercertTile = ({ id }: Pick<Hypercert, "id">) => {
  const { data } = useHypercertInfo(id);

  if (!data) {
    return (
      <Stack border="1px solid lightGray" padding={4} borderRadius="sm">
        <Text noOfLines={1}>{id}</Text>
        <Skeleton height="300px" />
      </Stack>
    );
  }

  const imgSrc = data.image;

  return (
    <Flex>
      <Image src={imgSrc} alt="image" height={450} />
    </Flex>
  );
};
