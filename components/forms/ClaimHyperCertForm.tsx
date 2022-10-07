import { ErrorMessage, Field, FieldProps, Formik } from "formik";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import { useMintHyperCertificate } from "../../hooks/mint";
import * as Yup from "yup";
import { FORMAT_VERSION, urls } from "../../constants";
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
import { useEffect, useState } from "react";
import _ from "lodash";
import { isAddress } from "ethers/lib/utils";
import { uploadCertificateToIpfs } from "../../utils/ipfsClient";
import dayjs from "dayjs";

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(20, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  external_link: Yup.string().url().required("Required"),
  workScopes: Yup.array().min(1),
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

const defaultTime = dayjs().format("YYYY-MM-dd");

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
  fractions: "1000",
};

const ClaimHypercertPage = () => {
  const { address } = useWallet();
  const { push } = useRouter();
  const mintHyperCertificate = useMintHyperCertificate({
    onComplete: () => push(urls.myHypercerts.href),
  });
  const toast = useToast();
  const [currentQuery, setCurrentQuery] = useState<string | undefined>(() =>
    window.location.search.replace("?", "")
  );

  useEffect(() => {
    if (currentQuery !== undefined && currentQuery !== "") {
      push({ query: currentQuery });
    }
  }, [currentQuery]);

  const updateQueryString = (values: Record<string, unknown>) => {
    const filteredValues = _.pickBy(values);
    const formattedQueryString = qs.stringify(filteredValues);
    if (formattedQueryString !== currentQuery) {
      setCurrentQuery(formattedQueryString);
    }
  };

  const query = currentQuery !== undefined ? qs.parse(currentQuery) : {};

  return (
    <Container>
      <Formik
        validationSchema={ValidationSchema}
        validate={(values) => {
          updateQueryString(values);
        }}
        initialValues={{
          ...defaultValues,
          ...query,
        }}
        enableReinitialize
        onSubmit={async (val) => {
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

          // Upload certificate metadata to ipfs
          let certificateMetadataIpfsUrl: string | undefined;
          toast({
            description: toastMessages.metadataUploadStart,
            status: "info",
          });
          try {
            const metaData = {
              name: val.name,
              description: val.description,
              contributor_names: contributorNames,
              external_url: val.external_link,
              format_version: FORMAT_VERSION,
              prev_hypercert: val.prev_hypercert,
              refs: [],
            };
            const certificateIpfsMetadata = await uploadCertificateToIpfs(
              metaData
            );
            certificateMetadataIpfsUrl = certificateIpfsMetadata.url;
            toast({
              description: toastMessages.metadataUploadSuccess(
                certificateMetadataIpfsUrl!
              ),
              status: "success",
            });
          } catch (error) {
            toast({
              description: toastMessages.metadataUploadError,
              status: "error",
            });
            console.error(error);
          }

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
          const impactTimeEnd = val.impactTimeEnd
            ? new Date(val.impactTimeEnd).getTime() / 1000
            : 0;

          try {
            toast({
              description: toastMessages.mintingStart,
              status: "info",
            });
            await mintHyperCertificate({
              contributors: _.uniq([address!, ...contributorAddresses]),
              workTime: [workTimeStart, workTimeEnd],
              impactTime: [impactTimeStart, impactTimeEnd],
              uri: certificateMetadataIpfsUrl!,
              workScopeIds: val.workScopes.map((s) => s.value),
              impactScopeIds: val.impactScopes.map((option) => option.value),
              rightsIds: val.rights.map((right) => right.value),
              name: val.name,
              description: val.description,
              fractions: val.fractions.split(",").map((x) => parseInt(x, 10)),
            });
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
        }) => {
          return (
            <>
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
                      <ErrorMessage name="name" render={DisplayError} />
                    </Flex>
                    <Input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      placeholder={placeholders.name}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Flex>
                      <FormLabel>{labels.description}</FormLabel>
                      <ErrorMessage name="description" render={DisplayError} />
                    </Flex>
                    <Textarea
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={placeholders.description}
                      size="sm"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Flex>
                      <FormLabel>{labels.contributors}</FormLabel>
                      <ErrorMessage name="description" render={DisplayError} />
                    </Flex>
                    <Textarea
                      name="contributors"
                      value={values.contributors}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={placeholders.description}
                      size="sm"
                      disabled={isSubmitting}
                    />
                    <FormHelperText>{helperTexts.contributors}</FormHelperText>
                  </FormControl>
                  <FormControl isRequired>
                    <Flex>
                      <FormLabel>{labels.externalLink}</FormLabel>
                      <ErrorMessage
                        name="external_link"
                        render={DisplayError}
                      />
                    </Flex>
                    <Input
                      type="text"
                      name="external_link"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.external_link}
                      placeholder={placeholders.external_link}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Flex>
                      <FormLabel>{labels.fractions}</FormLabel>
                      <ErrorMessage name="fractions" render={DisplayError} />
                    </Flex>
                    <Input
                      type="text"
                      name="fractions"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fractions}
                      placeholder={placeholders.external_link}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                </VStack>
                <Divider my={3} />
                <HStack>
                  <FormControl>
                    <FormLabel>{placeholders.workTimeStartLabel}</FormLabel>
                    <Input
                      type="date"
                      name="workTimeStart"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.workTimeStart}
                      disabled={isSubmitting}
                    />
                    {!errors.workTimeStart ? (
                      <FormHelperText>
                        {placeholders.workTimeStartDescription}
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        {errors.workTimeStart}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>{placeholders.workTimeEndLabel}</FormLabel>
                    <Input
                      type="date"
                      name="workTimeEnd"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.workTimeEnd}
                      disabled={isSubmitting}
                    />
                    {!errors.workTimeEnd ? (
                      <FormHelperText>
                        {placeholders.workTimeEndDescription}
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>{errors.workTimeEnd}</FormErrorMessage>
                    )}
                  </FormControl>
                </HStack>
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
                      disabled={isSubmitting}
                    />
                    {!errors.impactTimeStart ? (
                      <FormHelperText>
                        {placeholders.impactTimeStartDescription}
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        {errors.impactTimeStart}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>{placeholders.impactTimeEndLabel}</FormLabel>
                    <Input
                      type="date"
                      name="impactTimeEnd"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.impactTimeEnd}
                      disabled={isSubmitting}
                    />
                    {!errors.impactTimeEnd ? (
                      <FormHelperText>
                        {placeholders.impactTimeEndLabel}
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        {errors.impactTimeEnd}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </HStack>
                <Divider my={3} />
                <FormControl isRequired>
                  <Flex>
                    <FormLabel>{placeholders.workScopesLabel}</FormLabel>
                    <ErrorMessage name="workScopes" render={DisplayError} />
                  </Flex>
                  <Field name="workScopes">
                    {({ form }: FieldProps) => (
                      <WorkScopesAutoComplete
                        value={values.workScopes}
                        disabled={isSubmitting}
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
                    <ErrorMessage name="impactScopes" render={DisplayError} />
                  </Flex>
                  <Field name="impactScopes">
                    {({ form }: FieldProps) => (
                      <ImpactScopesAutoComplete
                        value={values.impactScopes}
                        disabled={isSubmitting}
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
                    <ErrorMessage name="rights" render={DisplayError} />
                  </Flex>
                  <Field name="rights">
                    {({ form }: FieldProps) => (
                      <RightsAutoComplete
                        value={values.rights}
                        disabled={isSubmitting}
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
                  disabled={!isValid || isSubmitting}
                  colorScheme="green"
                >
                  {buttons.submit}
                </Button>
              </form>
            </>
          );
        }}
      </Formik>
    </Container>
  );
};

const DisplayError = (message: string) => (
  <span style={{ color: "red" }}>- {message}</span>
);

export default ClaimHypercertPage;
