import {
  MintHypercertAllowlistEntryArgs,
  useMintHyperCertificateAllowlistEntry,
} from "../hooks/mint";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

export const MintTransactionAllowlistFraction = ({
  args,
  onComplete,
}: {
  args: MintHypercertAllowlistEntryArgs;
  onComplete?: () => void;
}) => {
  const [initiatedWrite, setInitiatedWrite] = useState(false);
  const { write, step, error, isReadyToWrite } =
    useMintHyperCertificateAllowlistEntry({
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

export default MintTransactionAllowlistFraction;
