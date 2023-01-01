import { MintHypercertArgs, useMintHyperCertificate } from "../hooks/mint";
import { useEffect } from "react";

export const MintTransactionOverview = ({
  args,
  onComplete,
}: {
  args: MintHypercertArgs;
  onComplete?: () => void;
}) => {
  const { write } = useMintHyperCertificate({
    args,
    enabled: true,
    onComplete,
  });

  useEffect(() => {
    write?.();
  }, []);

  return <div>Minting</div>;
};

export default MintTransactionOverview;
