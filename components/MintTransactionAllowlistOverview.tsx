import {
  MintHypercertArgs,
  MintHypercertWithAllowlistArgs,
  useMintHyperCertificate,
  useMintHyperCertificateWithAllowlist,
} from "../hooks/mint";
import { useEffect } from "react";
import { Text } from "@chakra-ui/react";

export const MintTransactionAllowlistOverview = ({
  args,
  onComplete,
}: {
  args: MintHypercertWithAllowlistArgs;
  onComplete?: () => void;
}) => {
  const { write, step, error } = useMintHyperCertificateWithAllowlist({
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

export default MintTransactionAllowlistOverview;
