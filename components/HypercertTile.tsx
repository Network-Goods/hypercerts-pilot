import { Hypercert, useHypercertInfo } from "../hooks/useHypercert";
import { Tile } from "./Tile";

export const HypercertTile = ({
  id,
  hoverEffect,
}: Pick<Hypercert, "id"> & { hoverEffect?: boolean }) => {
  const { data } = useHypercertInfo(id);

  if (!data) {
    return null;
  }

  return <Tile src={data.image} hoverEffect={hoverEffect} />;
};
