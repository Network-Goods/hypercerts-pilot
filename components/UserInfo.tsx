import { Avatar, Flex, Spinner, Text } from "@chakra-ui/react";
import { useUserInfoFallbacks } from "../hooks/useUserInfoFallbacks";
import React from "react";
import { ethers } from "ethers";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";
import { isAddress } from "ethers/lib/utils";

export const UserInfo = ({ nameOrAddress }: { nameOrAddress: string }) => {
  const isEnsName = nameOrAddress.endsWith(".eth");
  const isWalletAddress = isAddress(nameOrAddress);

  if (isEnsName) {
    return <EnsUserInfo ensName={nameOrAddress} />;
  }

  if (isWalletAddress) {
    return <AddressUserInfo address={nameOrAddress} />;
  }

  return <FreeformNameUserInfo name={nameOrAddress} />;
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

const Loader = () => (
  <Flex height="32px" minHeight="32px" alignItems="center">
    <Spinner size="lg" />
  </Flex>
);

const UserInfoEntry: React.FC<{
  avatarSrc?: string;
  avatarName?: string;
  name: string;
  url?: string;
}> = ({ url, avatarName, avatarSrc, name }) => {
  return (
    <WithLink link={url}>
      <Flex alignItems="center">
        <Avatar size="sm" src={avatarSrc} name={avatarName} />
        <Text ml={2}>{name}</Text>
      </Flex>
    </WithLink>
  );
};

const EnsUserInfo: React.FC<{ ensName: string }> = ({ ensName }) => {
  const { isLoading: loadingENS, data: address } = useEnsAddress({
    name: ensName,
  });
  const { data: avatar, isLoading: loadingAvatar } = useEnsAvatar({
    address: address || undefined,
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
    (x) => x.address.toLowerCase() === ensName
  );

  if (loadingENS || loadingAvatar) {
    return <Loader />;
  }

  return (
    <UserInfoEntry
      avatarSrc={avatar || fallbackUserInfo?.avatar}
      avatarName={fallbackUserInfo?.name || ensName}
      name={fallbackUserInfo?.name || ensName}
      url={`https://${ensName}`}
    />
  );
};

const AddressUserInfo: React.FC<{ address: string }> = ({ address }) => {
  const { data, isLoading: loadingENS } = useEnsName({
    address: address as `0x${string}`,
  });

  const { data: avatar, isLoading: loadingAvatar } = useEnsAvatar({
    address: address as `0x${string}`,
  });

  const { isLoading: loadingUserInfoFallBacks, data: fallbackData } =
    useUserInfoFallbacks();

  if (loadingENS || loadingUserInfoFallBacks || loadingAvatar) {
    return <Loader />;
  }

  const fallbackUserInfo = fallbackData?.find(
    (x) => x.address.toLowerCase() === address
  );

  return (
    <UserInfoEntry
      avatarSrc={avatar || fallbackUserInfo?.avatar}
      avatarName={data || fallbackUserInfo?.name}
      name={fallbackUserInfo?.name || address}
      url={fallbackUserInfo?.website}
    />
  );
};

const FreeformNameUserInfo: React.FC<{ name: string }> = ({ name }) => {
  const { isLoading: loadingUserInfoFallBacks, data: fallbackData } =
    useUserInfoFallbacks();

  if (loadingUserInfoFallBacks) {
    return <Loader />;
  }

  const fallbackUserInfo = fallbackData?.find(
    (x) => x.address.toLowerCase() === name
  );

  return (
    <UserInfoEntry
      avatarSrc={fallbackUserInfo?.avatar}
      avatarName={fallbackUserInfo?.name || name}
      name={fallbackUserInfo?.name || name}
      url={fallbackUserInfo?.website}
    />
  );
};
