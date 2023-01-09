import React, { useState } from "react";
import { MintHypercertWithAllowlistArgs } from "../hooks/mint";
import { AllowlistClaimForm } from "../components/forms/AllowlistClaimForm";
import MintTransactionAllowlistOverview from "../components/MintTransactionAllowlistOverview";

const ClaimHyperCertPage = () => {
  return <AllowlistClaimForm />;
};

export default ClaimHyperCertPage;
