import { Image, SlideFade } from "@chakra-ui/react";

export const Tile = ({
  src,
  hoverEffect = false,
}: {
  src: string;
  hoverEffect?: boolean;
}) => (
  <SlideFade in offsetY="20px">
    <Image
      cursor="pointer"
      borderRadius={16}
      boxShadow="2xl"
      src={src}
      alt="image"
      maxHeight={450}
      sx={
        hoverEffect
          ? {
              transition: "all .2s ease-in-out",
            }
          : {}
      }
      _hover={
        hoverEffect
          ? {
              transform: "scale(1.05)",
            }
          : {}
      }
    />
  </SlideFade>
);
