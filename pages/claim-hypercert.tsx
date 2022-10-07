import dynamic from "next/dynamic";

const DynamicClaimHyperCertForm = dynamic(
  () => import("../components/forms/ClaimHyperCertForm"),
  {
    ssr: false,
  }
);

const ClaimHyperCertPage = () => {
  return <DynamicClaimHyperCertForm />;
};

export default ClaimHyperCertPage;
