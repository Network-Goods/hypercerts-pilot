import { HyperCertMetadata } from "../../contract-types";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { storeMetadata, storeData } from "@network-goods/hypercerts-sdk";
import _ from "lodash";
import { MintHypercertWithAllowlistArgs } from "../../hooks/mint";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { BigNumber, ethers } from "ethers";
import { CID } from "nft.storage/dist/src/lib/interface";
import { client } from "../../utils/ipfsClient";

const previewWidth = "580px";

const DynamicClaimHyperCertForm = dynamic(
  () => import("./ClaimHyperCertForm"),
  {
    ssr: false,
  }
);

type AllowlistEntry = { address: string; fraction: string };

const initialValues = {
  contributors: [
    {
      address: "",
      fraction: "",
    },
    {
      address: "",
      fraction: "",
    },
    {
      address: "",
      fraction: "",
    },
  ],
};

const AllowlistForm = ({
  onStore,
}: {
  onStore: (args: { contributors: AllowlistEntry[] }) => void;
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ contributors }) => onStore({ contributors })}
    >
      {({ values, handleChange }) => (
        <Box maxWidth={`calc(100vw - ${previewWidth})`} p={4} px={8}>
          <Form>
            <FieldArray name="contributors">
              {({ remove, push }) => (
                <div>
                  {values.contributors.map((contributor, index) => (
                    <HStack key={index}>
                      <FormControl isRequired>
                        <FormLabel>{"Address"}</FormLabel>
                        <Input
                          type="text"
                          name={`contributors.${index}.address`}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>{"Fraction"}</FormLabel>
                        <Input
                          type="text"
                          name={`contributors.${index}.fraction`}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <Button
                        onClick={() => remove(index)}
                        colorScheme="red"
                        w={"125px"}
                      >
                        Remove
                      </Button>
                    </HStack>
                  ))}
                  <ButtonGroup width={"100%"} mt="1em" colorScheme="green">
                    <Button onClick={() => push({ address: "", fraction: "" })}>
                      Add
                    </Button>
                    <Button type="submit">Store</Button>
                  </ButtonGroup>
                </div>
              )}
            </FieldArray>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export const AllowlistClaimForm = ({
  onMetadataUploadedToIpfs,
}: {
  onMetadataUploadedToIpfs: (args: MintHypercertWithAllowlistArgs) => void;
}) => {
  const toast = useToast();
  const [merkleTree, setMerkleTree] =
    useState<StandardMerkleTree<(string | number)[]>>();
  const [merkleCID, setMerkleCID] = useState<CID>();
  const [units, setUnits] = useState<number>();

  const onStore = async ({
    contributors,
  }: {
    contributors: AllowlistEntry[];
  }) => {
    //TODO data validation
    // 100% total
    console.log("Contributors: ", contributors);
    const validEntries = contributors.filter(
      (entry) =>
        ethers.utils.isAddress(entry.address) && parseInt(entry.fraction, 10)
    );

    if (validEntries.length === 0) {
      toast({
        description: "No valid data submitted",
        status: "error",
      });
      return;
    }

    // Entries to arrays
    const mappedEntries = validEntries.map((validEntry) => [
      validEntry.address,
      parseInt(validEntry.fraction, 10),
    ]);

    const sum = validEntries
      .map((entry) => parseInt(entry.fraction, 10))
      .reduce((acc, curr) => acc + curr);

    const tree = StandardMerkleTree.of(mappedEntries, ["address", "uint256"]);
    const cid = await storeData(JSON.stringify(tree.dump()), client);

    setMerkleTree(tree);
    setMerkleCID(cid);
    setUnits(sum);
  };

  const onSubmit = async ({
    metaData,
    fractions,
  }: {
    metaData: HyperCertMetadata;
    fractions: number[];
  }) => {
    if (!merkleCID) {
      toast({
        description: "No allowlist ID found",
        status: "error",
      });
      console.error("No allowlist ID found");
      return;
    }

    if (!merkleTree?.root) {
      toast({
        description: "Merkle root not found",
        status: "error",
      });
      console.error("Merkle root not found");
      return;
    }

    const cid = await storeMetadata(
      { ...metaData, allowList: merkleCID },
      client
    );
    onMetadataUploadedToIpfs({
      units: _.sum(fractions),
      merkleRoot: merkleTree?.root,
      uri: cid,
    });
  };

  return (
    <VStack>
      <AllowlistForm onStore={onStore} />
      {merkleCID ? (
        <Alert
          status="info"
          borderRadius="md"
          mb={3}
          maxW={`calc(100vw - ${previewWidth})`}
        >
          <AlertIcon />
          <AlertTitle>{`Uploaded allowlist to IPFS with CID: ${merkleCID}`}</AlertTitle>
        </Alert>
      ) : undefined}
      <Divider />
      <DynamicClaimHyperCertForm onSubmit={onSubmit} units={units} />
    </VStack>
  );
};
