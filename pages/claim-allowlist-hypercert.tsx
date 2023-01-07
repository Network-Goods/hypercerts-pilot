import React, { useState } from "react";
import { MintHypercertArgs } from "../hooks/mint";
import MintTransactionOverview from "../components/MintTransactionOverview";
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
        <MintTransactionOverview
          args={claimMetadataArgs}
          onComplete={onMintComplete}
        />
      )}
    </>
  );
};

export default ClaimHyperCertPage;
