import { Hypercert, useHypercertInfo } from "../hooks/useHypercert";
import { Tile } from "./Tile";
import Link from "next/link";

export const HypercertTile = ({
  id,
  hoverEffect,
}: Pick<Hypercert, "id"> & { hoverEffect?: boolean }) => {
  const { data } = useHypercertInfo(id);

  if (!data) {
    return null;
  }

  return (
    <Link href={`/hypercerts/${id}`} passHref>
      <a>
        <Tile src={data.image} hoverEffect={hoverEffect} />
      </a>
    </Link>
  );
};
