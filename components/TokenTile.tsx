import { Hypercert, useFractionInfo } from "../hooks/useHypercert";
import { Tile } from "./Tile";

export const TokenTile = ({ id }: Pick<Hypercert, "id">) => {
  const { data } = useFractionInfo(id);

  if (!data) {
    return null;
  }

  return <Tile src={data.image} />;
};
