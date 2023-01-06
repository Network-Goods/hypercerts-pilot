import { MintHypercertArgs, useMintHyperCertificate } from "../hooks/mint";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";

export const MintTransactionOverview = ({
  args,
  onComplete,
}: {
  args: MintHypercertArgs;
  onComplete?: () => void;
}) => {
  const { write, step, error } = useMintHyperCertificate({
    args,
    enabled: true,
    onComplete,
  });

  useEffect(() => {
    write?.();
  }, []);

  return (
    <>
      <div>{step}</div>
      {error && <Text color="red">{error.message}</Text>}
    </>
  );
};

export default MintTransactionOverview;
