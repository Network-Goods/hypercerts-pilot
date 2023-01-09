import { HyperCertMetadata } from "../../contract-types";
import dynamic from "next/dynamic";
import React from "react";
import { storeMetadata } from "@network-goods/hypercerts-sdk";
import _ from "lodash";
import { MintHypercertArgs, useMintHyperCertificate } from "../../hooks/mint";
import { client } from "../../utils/ipfsClient";

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
  const onComplete = () => {
    console.log("Done minting!");
  };

  const { write } = useMintHyperCertificate({
    enabled: true,
    onComplete,
  });

  const onSubmit = async ({
    metaData,
    fractions,
  }: {
    metaData: HyperCertMetadata;
    fractions: number[];
  }) => {
    write(metaData, _.sum(fractions));
    // onMetadataUploadedToIpfs({
    //   uri: cid,
    //   units: _.sum(fractions),
    // });
  };

  return <DynamicClaimHyperCertForm onSubmit={onSubmit} />;
};
