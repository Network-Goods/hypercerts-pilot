import { useClaimMetadata } from "../hooks/useHypercert";
import { Tile } from "./Tile";
import Link from "next/link";
import { Claim } from "../hooks/listHypercerts";

export const HypercertTile = ({
  id,
  uri,
  hoverEffect,
}: Pick<Claim, "id" | "uri"> & { hoverEffect?: boolean }) => {
  const { data } = useClaimMetadata(uri);

  if (!data) {
    return null;
  }

  return (
    <Link href={`/hypercerts/${id}`}>
      <Tile src={data.image} hoverEffect={hoverEffect} />
    </Link>
  );
};
