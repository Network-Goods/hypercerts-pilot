import { Hypercert, useFractionInfo } from "../hooks/useHypercert";
import { Tile } from "./Tile";

export const TokenTile = ({
  id,
  hoverEffect,
}: Pick<Hypercert, "id"> & { hoverEffect?: boolean }) => {
  const { data } = useFractionInfo(id);

  if (!data) {
    return null;
  }

  return <Tile src={data.image} hoverEffect={hoverEffect} />;
};
