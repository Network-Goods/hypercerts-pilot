import dynamic from "next/dynamic";
import { useState } from "react";
import { MintHypercertArgs } from "../hooks/mint";
const MintTransactionOverview = dynamic(
  () => import("../components/MintTransactionOverview"),
  { ssr: false }
);

const DynamicClaimHyperCertForm = dynamic(
  () => import("../components/forms/ClaimHyperCertForm"),
  {
    ssr: false,
  }
);

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
        <DynamicClaimHyperCertForm
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
