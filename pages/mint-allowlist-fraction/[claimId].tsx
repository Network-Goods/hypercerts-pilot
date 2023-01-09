import React, { useEffect, useState } from "react";
import { MintHypercertAllowlistEntryArgs } from "../../hooks/mint";
import MintTransactionAllowlistFraction from "../../components/MintTransactionAllowlistFraction";
import { BigNumber, BytesLike } from "ethers";
import {
  Box,
  Button,
  Heading,
  useToast,
  Text,
  Center,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { getMetadata, claimById, getData } from "@network-goods/hypercerts-sdk";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

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
  const { address, isConnected } = useAccount();
  const { query } = useRouter();
  console.log(query);

  const claimID = query["claimId"] as string;

  const [merkleCID, setMerkleCID] = useState<string>();
  const [merkleTree, setMerkleTree] =
    useState<StandardMerkleTree<(string | number)[]>>();
  const [merkleProofs, setMerkleProofs] = useState<string[]>();
  const [units, setUnits] = useState<number>();
  const [claimIDContract, setClaimIDContract] = useState<BigNumber>();

  const onClick = () => {
    if (!merkleProofs || !claimIDContract || !units) {
      toast({ description: "Missing data", status: "error" });
      return;
    }

    onProofFound(merkleProofs, claimIDContract, BigNumber.from(units));
  };

  //Claim for user

  useEffect(() => {
    const _fetchMerkleCID = async (claimID: string) => {
      const claimByIdRes = await claimById(claimID);

      if (!claimByIdRes.claim) {
        toast({
          description: `No claim found for ${claimID}`,
          status: "error",
        });
        return;
      }

      const claim = claimByIdRes.claim;

      // ClaimID
      const _id = claim.tokenID;
      setClaimIDContract(_id);

      //Metadata
      const metadata = await getMetadata(claim.uri || "");

      if (!metadata?.allowList) {
        toast({
          description: `No allowlist found for ${claimID}`,
          status: "error",
        });
        return;
      }

      setMerkleCID(metadata.allowList);
    };
    if (claimID && !merkleCID) {
      _fetchMerkleCID(claimID);
    }
  }, [claimID]);

  useEffect(() => {
    const _fetchMerkleTree = async (merkleCID: string) => {
      const treeResponse = await getData(merkleCID);

      if (!treeResponse) {
        return;
      }

      setMerkleTree(StandardMerkleTree.load(JSON.parse(treeResponse)));
    };
    if (merkleCID) {
      _fetchMerkleTree(merkleCID);
    }
  }, [merkleCID]);

  // Proofs for user
  useEffect(() => {
    const findProof = (tree: StandardMerkleTree<(string | number)[]>) => {
      console.log("Entries: ", tree.entries());
      for (const [i, v] of tree.entries()) {
        console.log("Entry: ", i);
        if (v[0] === address) {
          const proof = tree.getProof(i);
          console.log(proof, v);
          setMerkleProofs(proof);
          setUnits(Number(v[1]));
          console.log(`proof `, proof);
        }
      }
    };
    if (!merkleTree || !address) {
      return;
    }

    if (merkleTree && address) {
      findProof(merkleTree);
    }
  }, [merkleTree, address]);

  // Return
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

        <Button onClick={onClick} colorScheme="green">
          Continue
        </Button>
      </VStack>
    </Center>
  );
};

const MintAllowlistFractionPage = () => {
  const [step, setStep] = useState<"find" | "minting" | "complete">("find");
  const [allowlistMintArgs, setAllowlistMintArgs] =
    useState<MintHypercertAllowlistEntryArgs>();

  const onProofFound = (
    proof: string[],
    claimID: BigNumber,
    units: BigNumber
  ) => {
    setAllowlistMintArgs({ proof, claimID, units });
    setStep("minting");
  };

  const onMintComplete = () => {
    setStep("complete");
  };

  return (
    <>
      {step === "find" && <FindAllowlistProof onProofFound={onProofFound} />}
      {step === "minting" && allowlistMintArgs && (
        <MintTransactionAllowlistFraction
          args={allowlistMintArgs}
          onComplete={onMintComplete}
        />
      )}
    </>
  );
};

export default MintAllowlistFractionPage;
