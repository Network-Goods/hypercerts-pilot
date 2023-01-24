import React, { useEffect, useState } from "react";
import { useMintHyperCertificateAllowlistEntry } from "../../hooks/mintHyperCertificateAllowlistEntry";
import { BigNumber } from "ethers";
import {
  Button,
  Heading,
  useToast,
  Text,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { useContractModal } from "../../components/ContractInteractionModalContext";
import { verifyFractionClaim } from "../../lib/verifyFractionClaim";

// TODO: These hooks should be generalized
const FindAllowlistProof = ({
  onProofFound,
}: {
  onProofFound: (
    proofs: string[],
    claimId: BigNumber,
    units: BigNumber
  ) => void;
}) => {
  const toast = useToast();
  const { address } = useAccount();
  const { query } = useRouter();

  const claimID = query["claimId"] as string;

  const [merkleProofs, setMerkleProofs] = useState<string[]>();
  const [units, setUnits] = useState<number>();
  const [claimIDContract, setClaimIDContract] = useState<BigNumber>();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const verify = async (c: string, a: string) => {
      try {
        const {
          proof,
          units: _units,
          claimIDContract: _claimIdContract,
        } = await verifyFractionClaim(c, a);
        setMerkleProofs(proof);
        setUnits(_units);
        setClaimIDContract(BigNumber.from(_claimIdContract));
        setDisabled(false);
      } catch (e: any) {
        toast({
          description: e.message || "Something went wrong",
          status: "error",
        });
      }
    };
    if (address && claimID) {
      verify(claimID, address);
    }
  }, [address, claimID]);

  const onClick = () => {
    if (!merkleProofs || !claimIDContract || !units) {
      toast({ description: "Missing data", status: "error" });
      return;
    }

    onProofFound(merkleProofs, claimIDContract, BigNumber.from(units));
  };

  return (
    <Center>
      <VStack maxW={"50%"}>
        <Heading>Mint your share of a hypercert</Heading>

        <Heading size={"md"}>Claim ID</Heading>
        <Text>{claimIDContract?.toString() || "..."}</Text>

        <Heading size={"md"}>Proofs</Heading>
        <span>
          {merkleProofs?.map((line, index) => (
            <Text key={index}>{line}</Text>
          ))}
        </span>

        <Heading size={"md"}>Units to receive</Heading>

        <Text>{units}</Text>

        <Button onClick={onClick} disabled={disabled} colorScheme="green">
          Continue
        </Button>
      </VStack>
    </Center>
  );
};

const MintAllowlistFractionPage = () => {
  const { push } = useRouter();
  const { hideModal } = useContractModal();
  const onComplete = () => {
    setTimeout(async () => {
      hideModal();
      await push("/my-tokens");
    }, 5000);
  };

  const { write } = useMintHyperCertificateAllowlistEntry({
    onComplete,
    enabled: true,
  });

  return <FindAllowlistProof onProofFound={write} />;
};

export default MintAllowlistFractionPage;
