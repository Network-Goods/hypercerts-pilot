import React from "react";
import { useRouter } from "next/router";
import { HypercertMetadata } from "@network-goods/hypercerts-sdk";
import { useContractModal } from "../components/ContractInteractionModalContext";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useMintClaim } from "../hooks/mintClaim";

const DynamicClaimHyperCertForm = dynamic(
  () => import("../components/forms/ClaimHyperCertForm"),
  {
    ssr: false,
  }
);

const ClaimHyperCertPage = () => {
  const { push } = useRouter();
  const { hideModal } = useContractModal();
  const onComplete = () => {
    setTimeout(() => {
      hideModal();
      push("/");
    }, 5000);
  };

  const { write } = useMintClaim({
    enabled: true,
    onComplete,
  });

  const onSubmit = async ({
    metaData,
    fractions,
  }: {
    metaData: HypercertMetadata;
    fractions: number[];
  }) => {
    await write(metaData, _.sum(fractions));
  };

  return <DynamicClaimHyperCertForm onSubmit={onSubmit} />;
};

export default ClaimHyperCertPage;
