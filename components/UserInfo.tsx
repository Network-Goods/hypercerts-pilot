import { formatAddress, useENS } from "@raidguild/quiver";
import { Avatar, Flex, Spinner, Text } from "@chakra-ui/react";
import { useUserInfoFallbacks } from "../hooks/useUserInfoFallbacks";
import React from "react";
import { ethers } from "ethers";

export const UserInfo = ({ address }: { address: string }) => {
  const {
    loading: loadingENS,
    avatar,
    ens,
  } = useENS({
    address: ethers.utils.isAddress(address) ? address : undefined,
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
    (x) => x.address.toLowerCase() === address
  );

  const avatarSrc = avatar || fallbackUserInfo?.avatar;
  const avatarName = ens || fallbackUserInfo?.name;
  const name =
    ens ||
    fallbackUserInfo?.name ||
    (ethers.utils.isAddress(address) ? formatAddress(address) : address);
  const url = ens ? `https://${ens}.eth` : fallbackUserInfo?.website;

  return (
    <WithLink link={url}>
      <Flex alignItems="center">
        <Avatar size="sm" src={avatarSrc} name={avatarName} />
        <Text ml={4}>{name}</Text>
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
