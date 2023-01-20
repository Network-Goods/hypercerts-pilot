import { useClaimEligibility } from "../../hooks/mintClaimAllowlist";
import { Button } from "@chakra-ui/react";

const ClaimAllPage = () => {
  const { data } = useClaimEligibility();

  if (!data) {
    return null;
  }

  return (
    <>
      {data.map(({ claim }) => (
        <div>{claim}</div>
      ))}
      <Button colorScheme="green">Claim all</Button>
    </>
  );
};

export default ClaimAllPage;
