import { Image, SlideFade } from "@chakra-ui/react";
import { Hypercert, useFractionInfo } from "../hooks/useHypercert";

export const TokenTile = ({ id }: Pick<Hypercert, "id">) => {
  const { data } = useFractionInfo(id);

  if (!data) {
    return null;
  }

  return (
    <SlideFade in offsetY="20px">
      <Image
        cursor="pointer"
        borderRadius={16}
        boxShadow="2xl"
        src={data.image}
        alt="image"
        maxHeight={450}
        sx={{
          transition: "all .2s ease-in-out",
        }}
        _hover={{
          transform: "transform: scale(1.1)",
        }}
      />
    </SlideFade>
  );
};
