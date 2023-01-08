import React, { useState } from "react";
import { MintHypercertArgs } from "../hooks/mint";
import MintTransactionDialog from "../components/MintTransactionDialog";
import { RegularClaimForm } from "../components/forms/RegularClaimForm";

const ClaimHyperCertPage = () => {
  const [step, setStep] = useState<"form" | "minting" | "complete">("form");
  const [claimMetadataArgs, setClaimMetadataArgs] =
    useState<MintHypercertArgs>();

  const onMetadataUploadedToIpfs = (args: MintHypercertArgs) => {
    setClaimMetadataArgs(args);
    setStep("minting");
  };

  const onMintComplete = () => {
    setStep("complete");
  };

  return (
    <>
      {step === "form" && (
        <RegularClaimForm onMetadataUploadedToIpfs={onMetadataUploadedToIpfs} />
      )}
      {step === "minting" && claimMetadataArgs && (
        <MintTransactionDialog
          args={claimMetadataArgs}
          onComplete={onMintComplete}
        />
      )}
    </>
  );
};

export default ClaimHyperCertPage;
