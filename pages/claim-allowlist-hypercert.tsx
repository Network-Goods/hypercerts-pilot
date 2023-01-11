import dynamic from "next/dynamic";
import React, { useState } from "react";
import { HypercertMetadata } from "@network-goods/hypercerts-sdk";
import _ from "lodash";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useContractModal } from "../components/ContractInteractionModalContext";
import { useMintClaimAllowlist } from "../hooks/mintClaimAllowlist";

const previewWidth = "580px";

const DynamicClaimHyperCertForm = dynamic(
  () => import("../components/forms/ClaimHyperCertForm"),
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
  onStore: (args: { contributors: AllowlistEntry[] }) => Promise<void>;
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ contributors }) => onStore({ contributors })}
    >
      {({ values, handleChange, isSubmitting }) => {
        const disabled = isSubmitting;
        return (
          <Box maxWidth={`calc(100vw - ${previewWidth})`} p={4} px={8}>
            <Form>
              <FieldArray name="contributors">
                {({ remove, push }) => (
                  <div>
                    {values.contributors.map((contributor, index) => (
                      <HStack key={index} alignItems="flex-end">
                        <FormControl isRequired>
                          <FormLabel>{"Address"}</FormLabel>
                          <Input
                            type="text"
                            name={`contributors.${index}.address`}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>{"Fraction"}</FormLabel>
                          <Input
                            type="text"
                            name={`contributors.${index}.fraction`}
                            disabled={isSubmitting}
                            onChange={handleChange}
                          />
                        </FormControl>
                        <Button
                          onClick={() => remove(index)}
                          colorScheme="red"
                          disabled={isSubmitting}
                          w={"125px"}
                        >
                          Remove
                        </Button>
                      </HStack>
                    ))}
                    <ButtonGroup
                      width={"100%"}
                      mt="1em"
                      colorScheme="green"
                      isDisabled={disabled}
                    >
                      <Button
                        onClick={() => push({ address: "", fraction: "" })}
                      >
                        Add
                      </Button>
                      <Button type="submit">Store</Button>
                    </ButtonGroup>
                  </div>
                )}
              </FieldArray>
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};

export const AllowlistClaimForm = () => {
  const { push } = useRouter();
  const { hideModal } = useContractModal();
  const onComplete = () => {
    setTimeout(() => {
      hideModal();
      push("/");
    }, 5000);
  };

  const { write } = useMintClaimAllowlist({ onComplete, enabled: true });

  const [units, setUnits] = useState<number>();
  const [pairs, setPairs] = useState<{ address: string; fraction: number }[]>(
    []
  );

  const onStore = async ({
    contributors,
  }: {
    contributors: AllowlistEntry[];
  }) => {
    //TODO data validation
    // 100% total
    console.log("Contributors: ", contributors);
    const validEntries = contributors
      .filter(
        (entry) => ethers.utils.isAddress(entry.address) && entry.fraction
      )
      .map((x) => ({
        address: x.address,
        fraction: parseInt(x.fraction, 10),
      }));
    setPairs(validEntries);
    setUnits(_.sum(validEntries.map((e) => e.fraction)));
  };

  const onSubmit = async ({
    metaData,
  }: {
    metaData: HypercertMetadata;
    fractions: number[];
  }) => {
    await write(metaData, pairs);
  };

  return (
    <VStack>
      <AllowlistForm onStore={onStore} />
      <Divider />
      <DynamicClaimHyperCertForm
        onSubmit={onSubmit}
        units={units}
        disabled={pairs.length === 0}
      />
    </VStack>
  );
};

export default AllowlistClaimForm;
