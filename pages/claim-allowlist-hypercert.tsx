import React, { useState } from "react";
import {
  MintHypercertArgs,
  MintHypercertWithAllowlistArgs,
} from "../hooks/mint";
import MintTransactionOverview from "../components/MintTransactionOverview";
import { AllowlistClaimForm } from "../components/forms/AllowlistClaimForm";
import MintTransactionAllowlistOverview from "../components/MintTransactionAllowlistOverview";

const ClaimHyperCertPage = () => {
  const [step, setStep] = useState<"form" | "minting" | "complete">("form");
  const [claimMetadataArgs, setClaimMetadataArgs] =
    useState<MintHypercertWithAllowlistArgs>();

  const onMetadataUploadedToIpfs = (args: MintHypercertWithAllowlistArgs) => {
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
        <MintTransactionAllowlistOverview
          args={claimMetadataArgs}
          onComplete={onMintComplete}
        />
      )}
    </>
  );
};

export default ClaimHyperCertPage;
