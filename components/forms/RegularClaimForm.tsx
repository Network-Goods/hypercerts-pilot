import { HyperCertMetadata } from "../../contract-types";
import dynamic from "next/dynamic";
import React from "react";
import { storeMetadata } from "../../../hypercerts-sdk";
import _ from "lodash";
import { MintHypercertArgs } from "../../hooks/mint";

const DynamicClaimHyperCertForm = dynamic(
  () => import("./ClaimHyperCertForm"),
  {
    ssr: false,
  }
);

export const RegularClaimForm = ({
  onMetadataUploadedToIpfs,
}: {
  onMetadataUploadedToIpfs: (args: MintHypercertArgs) => void;
}) => {
  const onSubmit = async ({
    metaData,
    fractions,
  }: {
    metaData: HyperCertMetadata;
    fractions: number[];
  }) => {
    const cid = await storeMetadata(metaData);
    onMetadataUploadedToIpfs({
      uri: cid,
      units: _.sum(fractions),
    });
  };

  return <DynamicClaimHyperCertForm onSubmit={onSubmit} />;
};
