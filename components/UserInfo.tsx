import { formatAddress, useENS } from "@raidguild/quiver";
import { Avatar, Flex, Spinner, Text } from "@chakra-ui/react";
import { useUserInfoFallbacks } from "../hooks/useUserInfoFallbacks";
import React from "react";
import { ethers } from "ethers";

export const UserInfo = ({ nameOrAddress }: { nameOrAddress: string }) => {
  const {
    loading: loadingENS,
    avatar,
    ens,
  } = useENS({
    ens: nameOrAddress,
  });
  const { isLoading: loadingUserInfoFallBacks, data: fallbackData } =
    useUserInfoFallbacks();

  if (loadingENS || loadingUserInfoFallBacks) {
    return (
      <Flex height="32px" minHeight="32px" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  const fallbackUserInfo = fallbackData?.find(
    (x) => x.address.toLowerCase() === nameOrAddress
  );

  const avatarSrc = avatar || fallbackUserInfo?.avatar;
  const avatarName = ens || fallbackUserInfo?.name;
  const name =
    ens ||
    fallbackUserInfo?.name ||
    (ethers.utils.isAddress(nameOrAddress)
      ? formatAddress(nameOrAddress)
      : nameOrAddress);
  const url = ens ? `https://${ens}` : fallbackUserInfo?.website;

  return (
    <WithLink link={url}>
      <Flex alignItems="center">
        <Avatar size="sm" src={avatarSrc} name={avatarName} />
        <Text ml={2}>{name}</Text>
      </Flex>
    </WithLink>
  );
};

const WithLink = ({
  link,
  children,
}: React.PropsWithChildren<{ link?: string }>) =>
  link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <>{children}</>
  );
