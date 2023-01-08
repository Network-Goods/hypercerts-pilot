import { MintHypercertArgs, useMintHyperCertificate } from "../hooks/mint";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

export const MintTransactionDialog = ({
  args,
  onComplete,
}: {
  args: MintHypercertArgs;
  onComplete?: () => void;
}) => {
  const [initiatedWrite, setInitiatedWrite] = useState(false);
  const { write, step, error, isReadyToWrite } = useMintHyperCertificate({
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

export default MintTransactionDialog;
