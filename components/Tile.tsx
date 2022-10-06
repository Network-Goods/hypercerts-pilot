import { Image, SlideFade } from "@chakra-ui/react";

export const Tile = ({ src }: { src: string }) => (
  <SlideFade in offsetY="20px">
    <Image
      cursor="pointer"
      borderRadius={16}
      boxShadow="2xl"
      src={src}
      alt="image"
      maxHeight={450}
      sx={{
        transition: "all .2s ease-in-out",
      }}
      _hover={{
        transform: "scale(1.05)",
      }}
    />
  </SlideFade>
);
