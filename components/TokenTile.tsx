import { Fade, Image, SlideFade } from "@chakra-ui/react";
import { Hypercert, useFractionInfo } from "../hooks/useHypercert";

export const TokenTile = ({ id }: Pick<Hypercert, "id">) => {
  const { data } = useFractionInfo(id);

  if (!data) {
    return null;
  }

  return (
    <SlideFade in offsetY="20px">
      <Fade in>
        <Image
          cursor="pointer"
          borderRadius={16}
          boxShadow="2xl"
          src={data.image}
          alt="image"
          maxHeight={450}
        />
      </Fade>
    </SlideFade>
  );
};
