import { useClaimEligibility } from "../../hooks/mintClaimAllowlist";
import { Button } from "@chakra-ui/react";
import { useBatchMintHyperCertificateAllowlistEntry } from "../../hooks/mintBatchHyperCertificateAllowlistEntry";
import { useRouter } from "next/router";
import { useContractModal } from "../../components/ContractInteractionModalContext";

const ClaimAllPage = () => {
  const { push } = useRouter();
  const { hideModal } = useContractModal();
  const onComplete = () => {
    setTimeout(async () => {
      hideModal();
      await push("/my-tokens");
    }, 5000);
  };

  const { data } = useClaimEligibility();
  const { write } = useBatchMintHyperCertificateAllowlistEntry({ onComplete });

  if (!data) {
    return null;
  }

  const onClickMint = () => write(data.map((x) => x.claim));

  return (
    <>
      {data.map(({ claim }) => (
        <div key={claim}>{claim}</div>
      ))}
      <Button colorScheme="green" onClick={onClickMint}>
        Claim all
      </Button>
    </>
  );
};

export default ClaimAllPage;
