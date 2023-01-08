import {
  MintHypercertWithAllowlistArgs,
  useMintHyperCertificateWithAllowlist,
} from "../hooks/mint";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

export const MintTransactionAllowlistOverview = ({
  args,
  onComplete,
}: {
  args: MintHypercertWithAllowlistArgs;
  onComplete?: () => void;
}) => {
  const [initiatedWrite, setInitiatedWrite] = useState(false);
  const { write, step, error, isReadyToWrite } =
    useMintHyperCertificateWithAllowlist({
      args,
      enabled: true,
      onComplete,
    });

  useEffect(() => {
    if (isReadyToWrite && !initiatedWrite) {
      write?.();
      setInitiatedWrite(true);
    }
  }, [isReadyToWrite]);

  return (
    <>
      <div>{step}</div>
      {error && <Text color="red">{error.message}</Text>}
    </>
  );
};

export default MintTransactionAllowlistOverview;
