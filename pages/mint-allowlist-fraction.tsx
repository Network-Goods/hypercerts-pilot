import React, { useEffect, useState } from "react";
import { MintHypercertAllowlistEntryArgs } from "../hooks/mint";
import MintTransactionAllowlistFraction from "../components/MintTransactionAllowlistFraction";
import { BigNumber, Bytes, BytesLike } from "ethers";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { getMetadata, claimById, getData } from "@network-goods/hypercerts-sdk";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { CID } from "nft.storage/dist/src/lib/interface";
import { useAccount } from "wagmi";
import { add } from "lodash";
import { Entity } from "@graphprotocol/graph-ts";

const FindAllowlistProof = ({
  onProofFound,
}: {
  onProofFound: (
    proofs: BytesLike[],
    claimId: BigNumber,
    units: number
  ) => void;
}) => {
  const toast = useToast();
  const { address, isConnected } = useAccount();

  const [merkleCID, setMerkleCID] = useState<string>();
  const [merkleTree, setMerkleTree] =
    useState<StandardMerkleTree<(string | number)[]>>();
  const [merkleProofs, setMerkleProofs] = useState<string[]>();

  //Claim for user
  const claimID =
    "0xcc08266250930e98256182734913bf1b361020720x800000000000000000000000000000000";

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

      //Metadata
      const metadata = await getMetadata(claim.uri);

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
      // Allowlist for claim from metadata
      const treeResponse = await getData(merkleCID);

      if (!treeResponse) {
        return;
      }

      const tree = StandardMerkleTree.load(treeResponse);

      setMerkleTree(tree);
    };
    if (merkleCID) {
      _fetchMerkleTree(merkleCID);
    }
  }, [merkleCID]);

  // Proofs for user
  useEffect(() => {
    console.log(`Tree `, merkleTree);

    const findProof = (tree: StandardMerkleTree<(string | number)[]>) => {
      let proof = [];

      console.log("Entries: ", tree.values());
      // for (const item of tree.entries()) {
      //   console.log("Entry: ", item);
      //   if (v[0] === address) {
      //     proof = tree.getProof(i);
      //     console.log("Value:", v);
      //     console.log("Proof:", proof);
      //   }
      // }
    };
    if (merkleTree && address) {
      const proof = findProof(merkleTree);
    }
  }, [merkleTree, address]);

  // Return
  return (
    <Box>
      <Heading>AllowList Find step</Heading>
      <Button onClick={() => onProofFound}> Continue</Button>
    </Box>
  );
};

const MintAllowlistFractionPage = () => {
  const [step, setStep] = useState<"find" | "minting" | "complete">("find");
  const [allowlistMintArgs, setAllowlistMintArgs] =
    useState<MintHypercertAllowlistEntryArgs>();

  const onProofFound = (
    proofs: BytesLike[],
    claimId: BigNumber,
    units: number
  ) => {
    setAllowlistMintArgs({ proofs, claimId, units });
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
