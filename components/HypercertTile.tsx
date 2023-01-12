import { useClaimMetadata } from "../hooks/useHypercert";
import { Tile } from "./Tile";
import Link from "next/link";

export const HypercertTile = ({
  id,
  uri,
  hoverEffect,
  disabled = false,
}: {
  id: string;
  uri: string;
  hoverEffect?: boolean;
  disabled?: boolean;
}) => {
  const { data } = useClaimMetadata(uri);

  if (!data) {
    return null;
  }

  if (disabled) {
    return <Tile src={data.image} hoverEffect={hoverEffect} />;
  }

  return (
    <Link href={`/hypercerts/${id}`}>
      <Tile src={data.image} hoverEffect={hoverEffect} />
    </Link>
  );
};
