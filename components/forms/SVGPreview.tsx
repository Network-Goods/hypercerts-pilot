import _ from "lodash";

import { Ref, useEffect, useState } from "react";
import { Box, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";

const colorPairs = [{ bg: "#25316D", fg: "#FFEEA8" }] as const;
const backgroundPatterns = ["/svgPatterns/pattern-1.svg"];

const height = "850px";
const width = 550;

const imageSize = 275;
const collectionLogoSize = 90;

const backgroundPatternHeight = 525;
const borderRadius = 22;

const paddingX = "56px";
const paddingY = "42px";

export const SVGPreview = ({
  name,
  imageSrc,
  impactScopeLabel,
  workScopeLabels = [],
  workTimeStart,
  workTimeEnd,
  collectionLogoSrc,
  imageRef,
}: {
  name: string;
  imageSrc?: string;
  impactScopeLabel?: string;
  workScopeLabels?: string[];
  workTimeStart?: string;
  workTimeEnd?: string;
  collectionLogoSrc?: string;
  imageRef?: Ref<HTMLDivElement>;
}) => {
  const [bg, setBg] = useState("");
  const [fg, setFg] = useState("");
  const [backgroundPatternSrc, setBackgroundPatternSrc] = useState<string>();

  useEffect(() => {
    const colorPair = _.sample(colorPairs)!;
    setBg(colorPair.bg);
    setFg(colorPair.fg);

    setBackgroundPatternSrc(_.sample(backgroundPatterns)!);
  }, []);

  const workTimeStartFormatted = dayjs(workTimeStart).format("YYYY-MM-DD");
  const workTimeEndFormatted = dayjs(workTimeEnd).format("YYYY-MM-DD");

  return (
    <Flex
      ref={imageRef}
      backgroundColor={bg}
      minHeight={height}
      height={height}
      width={width}
      minWidth={width}
      borderRadius={borderRadius}
      flexDirection="column"
      position="relative"
    >
      {backgroundPatternSrc && (
        <img
          alt="Image background pattern"
          src={backgroundPatternSrc}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: backgroundPatternHeight,
            width,
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          }}
        />
      )}
      <Image
        src={imageSrc || "/hypercerts_tile_background.png"}
        borderRadius={2000}
        height={imageSize}
        width={imageSize}
        position="absolute"
        top={backgroundPatternHeight / 2 - imageSize / 2}
        left={width / 2 - imageSize / 2}
      />
      {collectionLogoSrc && (
        <Image
          src={collectionLogoSrc}
          borderRadius={collectionLogoSize / 2}
          height={collectionLogoSize}
          width={collectionLogoSize}
          position="absolute"
          top={backgroundPatternHeight - collectionLogoSize / 2}
          left={width - collectionLogoSize - 10}
        />
      )}
      <Flex
        height={backgroundPatternHeight}
        minHeight={backgroundPatternHeight}
        flexDirection="column"
        justifyContent="flex-end"
      >
        {impactScopeLabel && (
          <Text
            px={paddingX}
            fontSize="24px"
            lineHeight="48px"
            color={fg}
            fontWeight={400}
            fontFamily="Ubuntu Mono"
            className="impact-scope-label"
          >
            {impactScopeLabel}
          </Text>
        )}
        <Box height="1px" minHeight="1px" width="100%" backgroundColor={fg} />
      </Flex>
      <Flex px={paddingX} py={paddingY} flexDirection="column" height="100%">
        <VStack alignItems="flex-start" spacing="32px">
          <Text
            color={fg}
            fontSize="22px"
            textTransform="uppercase"
            className="title"
          >
            {name}
          </Text>
          <HStack justifyContent="flex-start" spacing="18px">
            {workScopeLabels.map((label) => (
              <Flex
                alignItems="center"
                key={label}
                color={bg}
                bgColor={fg}
                borderRadius="10px"
                padding="5px 25px"
                fontSize="18px"
                fontFamily="Ubuntu Mono"
              >
                <div className="work-scope-label">{label}</div>
              </Flex>
            ))}
          </HStack>
        </VStack>
        <Flex mt="auto" flexDirection="column" fontFamily="Ubuntu Mono">
          <Text
            color="white"
            textTransform="uppercase"
            fontSize="16px"
            lineHeight="16px"
            className="work-time"
            fontWeight={500}
          >
            work period
          </Text>
          <Text
            color="white"
            fontSize="22px"
            lineHeight="24px"
            className="work-time"
            fontWeight={500}
          >
            {workTimeStartFormatted} to {workTimeEndFormatted}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
