import { ErrorMessage, Field, FieldProps, Formik } from "formik";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { FORMAT_VERSION, FRACTIONS_PER_CLAIM } from "../../constants";
import {
  alerts,
  buttons,
  helperTexts,
  labels,
  placeholders,
  toastMessages,
} from "../../content/claim-hypercert-content";
import { WorkScopesAutoComplete } from "../AutoComplete/WorkScopesAutoComplete";
import { ImpactScopesAutoComplete } from "../AutoComplete/ImpactScopesAutoComplete";
import { RightsAutoComplete } from "../AutoComplete/RightsAutoComplete";
import { Option } from "../AutoComplete/AutoComplete";
import { useRouter } from "next/router";
import qs from "qs";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { isAddress } from "ethers/lib/utils";
import {
  validateMetaData,
  validateClaimData,
  HypercertMetadata,
} from "@network-goods/hypercerts-sdk";
import dayjs from "dayjs";
import { useAccount } from "wagmi";
import { SVGPreview } from "./SVGPreview";
import { FiUpload } from "react-icons/fi";
import exportAsImage from "../../utils/exportRefAsImage";

const nameMinimumLength = 2;
const nameMaximumLength = 50;

const descriptionMinimumLength = 20;
const descriptionMaximumLength = 500;

const defaultFractions = "100";

const getCollectionLogoSrc = () => "/collection_logos/collection_logo.png";

const previewWidth = "580px";

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(nameMinimumLength, "Too Short!")
    .max(nameMaximumLength, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(descriptionMinimumLength, "Too Short!")
    .max(descriptionMaximumLength, "Too Long!")
    .required("Required"),
  external_link: Yup.string()
    .required()
    .test("valid uri", "Please enter a valid url", (value) => {
      if (!value) return false;
      const isIpfsUrl = value.match(/^(ipfs):\/\//);

      if (isIpfsUrl) {
        return true;
      }

      try {
        const urlSchema = Yup.string().url();
        urlSchema.validateSync(value);
        return true;
      } catch (e) {
        return false;
      }
    }),
  workScopes: Yup.array().min(0),
  impactScopes: Yup.array().min(0),
  rights: Yup.array().min(0),
  workTimeEnd: Yup.date().when("workTimeStart", (workTimeStart) => {
    return Yup.date().min(workTimeStart, "End date must be after start date");
  }),
  impactTimeEnd: Yup.date().when(
    ["impactTimeStart", "impactTimeInfinite"],
    (impactTimeStart, impactTimeInfinite) => {
      return Yup.date().min(
        impactTimeInfinite ? 0 : impactTimeStart,
        "End date must be after start date"
      );
    }
  ),
  fractions: Yup.string()
    .required()
    .test(
      "not enough fractions",
      "Fractions should be 10000 in total, you have less than that",
      (value) => {
        if (value === undefined) {
          return false;
        }

        const total = _.sum(value.split(", ").map((x) => parseInt(x, 10)));
        return !(total < FRACTIONS_PER_CLAIM);
      }
    )
    .test(
      "too many fractions",
      "Fractions should be 10000 in total, you have more than that",
      (value) => {
        if (value === undefined) {
          return false;
        }

        const total = _.sum(value.split(", ").map((x) => parseInt(x, 10)));
        return !(total > FRACTIONS_PER_CLAIM);
      }
    ),
});

const testValues = {
  name: "Fraction test 1",
  description: "Fraction description 1",
  external_link: "https://example.com",

  prev_hypercert: "a",

  format_version: FORMAT_VERSION,
  fractions: "100, 50, 20",
  workTimeStart: "2022-05-10",
  workTimeEnd: "2022-05-10",
  impactTimeStart: "2022-05-10",
  impactTimeEnd: "2022-05-10",

  workScopes: [] as Option[],
  impactScopes: [] as Option[],
  rights: [] as Option[],
  uri: "",
};

const defaultTime = dayjs().format("YYYY-MM-DD");

const defaultValues = {
  name: "",
  description: "",
  external_link: "",
  contributors: "",

  prev_hypercert: "",
  creators: [],
  workTimeStart: defaultTime as string | undefined,
  workTimeEnd: defaultTime as string | undefined,
  impactTimeStart: defaultTime as string | undefined,
  impactTimeEnd: defaultTime as string | undefined,
  workScopes: [] as Option[],
  impactScopes: [] as Option[],
  rights: [] as Option[],
  uri: "",
  fractions: defaultFractions,
  impactTimeInfinite: false,
};

const ClaimHypercertForm = ({
  onSubmit,
  units,
  disabled: disabledProp,
}: {
  onSubmit: (args: {
    metaData: HypercertMetadata;
    fractions: number[];
  }) => void;
  units?: number;
  disabled?: boolean;
}) => {
  const { address, isConnected } = useAccount();
  const { replace } = useRouter();
  const toast = useToast();
  const [currentQuery, setCurrentQuery] = useState<string | undefined>(() =>
    window.location.search.replace("?", "")
  );

  useEffect(() => {
    if (currentQuery !== undefined && currentQuery !== "") {
      replace({ query: currentQuery }, undefined, { scroll: false });
    }
  }, [currentQuery]);

  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();
  useEffect(() => {
    // create the preview
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const updateQueryString = (values: Record<string, unknown>) => {
    const filteredValues = _.pickBy(values);
    const formattedQueryString = qs.stringify(filteredValues);
    if (formattedQueryString !== currentQuery) {
      setCurrentQuery(formattedQueryString);
    }
  };

  const query = currentQuery !== undefined ? qs.parse(currentQuery) : {};

  const previewRef = useRef<HTMLDivElement | null>(null);

  const saveImageFromPreview = useCallback(async () => {
    if (!previewRef?.current) {
      throw new Error("No preview ref found, aborting");
    }
    return await exportAsImage(previewRef.current);
  }, [previewRef]);

  const _initialValues = units
    ? {
        ...defaultValues,
        ...query,
        fractions: units.toString(),
      }
    : {
        ...defaultValues,
        ...query,
      };

  return (
    <Box overflow="hidden">
      <Formik
        validationSchema={ValidationSchema}
        validateOnMount={true}
        validate={(values) => {
          updateQueryString(values);
        }}
        initialValues={_initialValues}
        enableReinitialize
        onSubmit={async (val) => {
          const image = await saveImageFromPreview();
          window.scrollTo({ top: 0, behavior: "smooth" });
          /**
           * Steps:
           * 1. (optional) Upload image to IPFS and get the cid for the image
           * 2. Create the metadata json and upload to IPFS as file, including the (optional) cid for the image
           * 3. Call the mint function on the contract with the required parameters, including the cid for the metadata json.
           */

          // Split contributor names and addresses. Addresses are stored on-chain, while names will be stored on IPFS.
          const contributorNamesAndAddresses = val.contributors
            .split(",")
            .map((name) => name.trim());
          const contributorNames = contributorNamesAndAddresses.filter(
            (x) => !isAddress(x)
          );
          const contributorAddresses = contributorNamesAndAddresses.filter(
            (x) => isAddress(x)
          );

          // Mint certificate using contract
          const workTimeStart = val.workTimeStart
            ? new Date(val.workTimeStart).getTime() / 1000
            : 0;
          const workTimeEnd = val.workTimeEnd
            ? new Date(val.workTimeEnd).getTime() / 1000
            : 0;
          const impactTimeStart = val.impactTimeStart
            ? new Date(val.impactTimeStart).getTime() / 1000
            : 0;
          const impactTimeEnd =
            !val.impactTimeInfinite && val.impactTimeEnd
              ? new Date(val.impactTimeEnd).getTime() / 1000
              : 0;

          try {
            toast({
              description: toastMessages.mintingStart,
              status: "info",
            });
            const fractions = val.fractions
              .split(",")
              .map((x) => parseInt(x, 10));
            const claimData = {
              contributors: _.uniq([address!, ...contributorAddresses]),
              workTimeframe: [workTimeStart, workTimeEnd],
              impactTimeframe: [impactTimeStart, impactTimeEnd],
              workScopes: val.workScopes[0]?.label || "",
              impactScopes: val.impactScopes[0]?.value || "",
              rightsIds: val.rights.map((right) => right.value),
            };
            const claimDataIsValid = validateClaimData(claimData);
            if (claimDataIsValid) {
              toast({
                description:
                  "Validation successful, uploading metadata to IPFS",
                status: "success",
              });
              const metaData = {
                name: val.name,
                description: val.description,
                image,
                properties: claimData,
              };

              const metaDataIsValid = validateMetaData(metaData);

              if (metaDataIsValid) {
                onSubmit({
                  metaData,
                  fractions,
                });
              }
            }
          } catch (error) {
            toast({
              description: toastMessages.mintingError,
            });
            console.error(error);
          }
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
          setFieldValue,
        }) => {
          const disabled = disabledProp || isSubmitting || !isConnected;
          return (
            <Flex>
              <Box maxWidth={`calc(100vw - ${previewWidth})`} p={4} px={8}>
                {isSubmitting && (
                  <Alert status="info" my={4}>
                    <AlertIcon />
                    <AlertTitle>{alerts.wait}</AlertTitle>
                  </Alert>
                )}
                <form onSubmit={handleSubmit}>
                  <VStack spacing={3}>
                    <FormControl isRequired>
                      <Flex>
                        <FormLabel>{labels.name}</FormLabel>
                        <ErrorMessage name="name" render={displayError} />
                      </Flex>
                      <Input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder={placeholders.name}
                        disabled={disabled}
                      />
                      <FormHelperText>
                        {helperTexts.minMaxLength(
                          values.name.length,
                          nameMinimumLength,
                          nameMaximumLength
                        )}
                      </FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                      <Flex>
                        <FormLabel>{labels.description}</FormLabel>
                        <ErrorMessage
                          name="description"
                          render={displayError}
                        />
                      </Flex>
                      <Textarea
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholders.description}
                        size="sm"
                        disabled={disabled}
                      />
                      <FormHelperText>
                        {helperTexts.minMaxLength(
                          values.description.length,
                          descriptionMinimumLength,
                          descriptionMaximumLength
                        )}
                      </FormHelperText>
                    </FormControl>
                    <FormControl>
                      <Flex>
                        <InputGroup
                          onClick={() => fileUploadRef.current?.click()}
                        >
                          <Input
                            type="text"
                            value={selectedFile?.name || ""}
                            readOnly
                          />
                          <InputRightElement>
                            <Icon as={FiUpload} color="green.500" />
                          </InputRightElement>
                        </InputGroup>
                        <Input
                          ref={fileUploadRef}
                          display="none"
                          onChange={(e) => onSelectFile(e)}
                          type="file"
                          accept="image/*"
                        />
                      </Flex>
                    </FormControl>
                    <FormControl isRequired>
                      <Flex>
                        <FormLabel>{labels.contributors}</FormLabel>
                      </Flex>
                      <Textarea
                        name="contributors"
                        value={values.contributors}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={placeholders.description}
                        size="sm"
                        disabled={disabled}
                      />
                      <FormHelperText>
                        {helperTexts.contributors}
                      </FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                      <Flex>
                        <FormLabel>{labels.externalLink}</FormLabel>
                        <ErrorMessage
                          name="external_link"
                          render={displayError}
                        />
                      </Flex>
                      <Input
                        type="text"
                        name="external_link"
                        onChange={handleChange}
                        onBlur={(e) => {
                          if (
                            e.target.value &&
                            !e.target.value.match(/^(https|http|ftp|ipfs):\/\//)
                          ) {
                            setFieldValue(
                              "external_link",
                              "https://" + e.target.value
                            );
                          }
                          handleBlur(e);
                        }}
                        value={values.external_link}
                        placeholder={placeholders.external_link}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <Flex>
                        <FormLabel>{labels.fractions}</FormLabel>
                        <ErrorMessage name="fractions" render={displayError} />
                      </Flex>
                      <Alert status="info" borderRadius="md" mb={3}>
                        <AlertIcon />
                        <AlertTitle>{helperTexts.fractions}</AlertTitle>
                      </Alert>
                      <Input
                        type="text"
                        name="fractions"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fractions}
                        placeholder={
                          units ? units.toString() : placeholders.fractions
                        }
                        isReadOnly={units !== undefined}
                        disabled={disabled}
                      />
                    </FormControl>
                  </VStack>
                  <Divider my={3} />
                  <HStack>
                    <FormControl isRequired>
                      <FormLabel>{placeholders.workTimeStartLabel}</FormLabel>
                      <Input
                        type="date"
                        name="workTimeStart"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.workTimeStart}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <Flex>
                        <FormLabel>{placeholders.workTimeEndLabel}</FormLabel>
                      </Flex>

                      <Input
                        type="date"
                        name="workTimeEnd"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.workTimeEnd}
                        disabled={disabled}
                      />
                    </FormControl>
                  </HStack>
                  <FormControl
                    isInvalid={!!(errors.workTimeStart || errors.workTimeEnd)}
                  >
                    {!errors.workTimeStart && !errors.workTimeEnd ? (
                      <FormHelperText>
                        {placeholders.workTimeDescription}
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        {errors.workTimeStart || errors.workTimeEnd}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Divider my={3} />
                  <HStack>
                    <FormControl isRequired>
                      <FormLabel>{placeholders.impactTimeStartLabel}</FormLabel>
                      <Input
                        type="date"
                        name="impactTimeStart"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.impactTimeStart}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>{placeholders.impactTimeEndLabel}</FormLabel>
                      <Flex>
                        <Input
                          type="date"
                          name="impactTimeEnd"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.impactTimeEnd}
                          disabled={disabled || !!values.impactTimeInfinite}
                        />
                        <Button
                          onClick={() =>
                            setFieldValue(
                              "impactTimeInfinite",
                              !values.impactTimeInfinite
                            )
                          }
                          ml={2}
                          colorScheme="green"
                          variant={
                            values.impactTimeInfinite ? "solid" : "ghost"
                          }
                          fontSize="24px"
                          disabled={disabled}
                        >
                          &infin;
                        </Button>
                      </Flex>
                    </FormControl>
                  </HStack>
                  <FormControl
                    isInvalid={
                      !!(errors.impactTimeStart || errors.impactTimeEnd)
                    }
                  >
                    {!errors.impactTimeStart && !errors.impactTimeEnd ? (
                      <FormHelperText>
                        {placeholders.impactTimeDescription}
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        {errors.impactTimeStart || errors.impactTimeEnd}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Divider my={3} />
                  <FormControl>
                    <Flex>
                      <FormLabel>{placeholders.workScopesLabel}</FormLabel>
                      <ErrorMessage name="workScopes" render={displayError} />
                    </Flex>
                    <Field name="workScopes">
                      {({ form }: FieldProps) => (
                        <WorkScopesAutoComplete
                          value={values.workScopes}
                          disabled={disabled}
                          onChange={(workScopes) =>
                            form.setFieldValue("workScopes", workScopes)
                          }
                        />
                      )}
                    </Field>
                    <FormHelperText>
                      {placeholders.workScopesDescription}
                    </FormHelperText>
                  </FormControl>
                  <Divider my={3} />
                  <FormControl>
                    <Flex>
                      <FormLabel>{placeholders.impactScopesLabel}</FormLabel>
                      <ErrorMessage name="impactScopes" render={displayError} />
                    </Flex>
                    <Field name="impactScopes">
                      {({ form }: FieldProps) => (
                        <ImpactScopesAutoComplete
                          value={values.impactScopes}
                          disabled={disabled}
                          onChange={(impactScopes) =>
                            form.setFieldValue("impactScopes", impactScopes)
                          }
                        />
                      )}
                    </Field>
                    <FormHelperText>
                      {placeholders.impactScopesDescription}
                    </FormHelperText>
                  </FormControl>
                  <Divider my={3} />
                  <FormControl>
                    <Flex>
                      <FormLabel>{placeholders.rightsLabel}</FormLabel>
                      <ErrorMessage name="rights" render={displayError} />
                    </Flex>
                    <Field name="rights">
                      {({ form }: FieldProps) => (
                        <RightsAutoComplete
                          value={values.rights}
                          disabled={disabled}
                          onChange={(rights) =>
                            form.setFieldValue("rights", rights)
                          }
                        />
                      )}
                    </Field>
                    <FormHelperText>
                      {placeholders.rightsDescription}
                    </FormHelperText>
                  </FormControl>
                  <Divider my={3} />
                  <Button
                    width="100%"
                    type="submit"
                    disabled={!isValid || disabled}
                    colorScheme="green"
                  >
                    {buttons.submit}
                  </Button>
                </form>
              </Box>
              <Box width={previewWidth}>
                <Box top="120px" right="16px">
                  <SVGPreview
                    imageRef={previewRef}
                    name={values.name}
                    imageSrc={preview}
                    impactScopeLabel={values.impactScopes
                      .map((x) => x.label)
                      .join(", ")}
                    workScopeLabels={values.workScopes.map((x) => x.label)}
                    workTimeStart={values.workTimeStart}
                    workTimeEnd={values.workTimeEnd}
                    collectionLogoSrc={getCollectionLogoSrc()}
                  />
                </Box>
              </Box>
            </Flex>
          );
        }}
      </Formik>
    </Box>
  );
};

const displayError = (message: string) => (
  <span style={{ color: "red" }}>- {message}</span>
);

export default ClaimHypercertForm;
