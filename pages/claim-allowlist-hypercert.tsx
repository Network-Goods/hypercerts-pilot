import React, { useState } from "react";
import { MintHypercertArgs } from "../hooks/mint";
import MintTransactionOverview from "../components/MintTransactionOverview";
import { AllowlistClaimForm } from "../components/forms/AllowlistClaimForm";

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
        <AllowlistClaimForm
          onMetadataUploadedToIpfs={onMetadataUploadedToIpfs}
        />
      )}
      {step === "minting" && claimMetadataArgs && (
        <MintTransactionOverview
          args={claimMetadataArgs}
          onComplete={onMintComplete}
        />
      )}
    </>
  );
};

export default ClaimHyperCertPage;
