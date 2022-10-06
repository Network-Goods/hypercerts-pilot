import { Hypercert, useHypercertInfo } from "../hooks/useHypercert";
import { Tile } from "./Tile";

export const HypercertTile = ({ id }: Pick<Hypercert, "id">) => {
  const { data } = useHypercertInfo(id);

  if (!data) {
    return null;
  }

  return <Tile src={data.image} />;
};
