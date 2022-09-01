import type { NextPage } from "next";
import { ErrorMessage, Field, FieldProps, Formik } from "formik";
import {
  Button,
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
} from "@chakra-ui/react";
import { Option } from "chakra-ui-simple-autocomplete";
import { ImageUploadField } from "../components/ImageUploadField";
import { uploadCertificateToIpfs } from "../utils/ipfsClient";
import { useWallet } from "@raidguild/quiver";
import { useMintHyperCertificate } from "../hooks/mint";
import * as Yup from "yup";
import { FORMAT_VERSION } from "../constants";
import {
  buttons,
  placeholders,
  toastMessages,
} from "../content/claim-hypercert-content";
import { WorkScopesAutoComplete } from "../components/AutoComplete/WorkScopesAutoComplete";
import { ImpactScopesAutoComplete } from "../components/AutoComplete/ImpactScopesAutoComplete";

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

const ClaimHypercertPage: NextPage = () => {
  const { address } = useWallet();
  const mintHyperCertificate = useMintHyperCertificate();
  const toast = useToast();

  return (
    <>
      <Formik
        validationSchema={ValidationSchema}
        initialValues={{
          name: "",
          description: "",
          external_link: "",
          image: null as File | null,

          format_version: FORMAT_VERSION,
          prev_hypercert: "",
          creators: [],
          workTimeStart: undefined as string | undefined,
          workTimeEnd: undefined as string | undefined,
          impactTimeStart: undefined as string | undefined,
          impactTimeEnd: undefined as string | undefined,
          workScopes: [] as Option[],
          rights: [],
          uri: "",
        }}
        onSubmit={async (val) => {
          console.log("Starting hypercert creation", val);
          /**
           * Steps:
           * 1. (optional) Upload image to IPFS and get the cid for the image
           * 2. Create the metadata json and upload to IPFS as file, including the (optional) cid for the image
           * 3. Call the mint function on the contract with the required parameters, including the cid for the metadata json.
           */

          // Upload certificate to ipfs
          let certificateMetadataIpfsId: string | undefined;
          toast({
            description: toastMessages.metadataUploadStart,
            status: "info",
          });
          try {
            const metaData = {
              description: val.description,
              external_url: val.external_link,
              format_version: val.format_version,
              name: val.name,
              prev_hypercert: val.prev_hypercert,
              refs: [],
            };
            const certificateIpfsMetadata = await uploadCertificateToIpfs(
              metaData,
              val.image
            );
            certificateMetadataIpfsId = certificateIpfsMetadata.url;
            toast({
              description: toastMessages.metadataUploadSuccess(
                certificateMetadataIpfsId
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
            ? new Date(val.workTimeStart).getTime()
            : 0;
          const workTimeEnd = val.workTimeEnd
            ? new Date(val.workTimeEnd).getTime()
            : 0;
          const impactTimeStart = val.impactTimeStart
            ? new Date(val.impactTimeStart).getTime()
            : 0;
          const impactTimeEnd = val.impactTimeEnd
            ? new Date(val.impactTimeEnd).getTime()
            : 0;

          try {
            toast({
              description: toastMessages.mintingStart,
              status: "info",
            });
            await mintHyperCertificate({
              creators: [address!],
              workTime: [workTimeStart, workTimeEnd],
              impactTime: [impactTimeStart, impactTimeEnd],
              uri: certificateMetadataIpfsId!,
              rightsIds: val.rights,
              workScopeIds: val.workScopes.map((s) => s.value),
              impactScopeIds: [],
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
          setFieldValue,
          isValid,
          isSubmitting,
          /* and other goodies */
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <Flex>
                  <FormLabel>Certificate name</FormLabel>
                  <ErrorMessage name="name" render={DisplayError} />
                </Flex>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder={placeholders.name}
                />
              </FormControl>
              <FormControl isRequired>
                <Flex>
                  <FormLabel>Description</FormLabel>
                  <ErrorMessage name="description" render={DisplayError} />
                </Flex>
                <Textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholders.description}
                  size="sm"
                />
              </FormControl>
              <FormControl isRequired>
                <Flex>
                  <FormLabel>External link</FormLabel>
                  <ErrorMessage name="external_link" render={DisplayError} />
                </Flex>
                <Input
                  type="text"
                  name="external_link"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.external_link}
                  placeholder={placeholders.external_link}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <ImageUploadField name="image" setFieldValue={setFieldValue} />
              </FormControl>
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
                  />
                  {!errors.workTimeStart ? (
                    <FormHelperText>
                      {placeholders.workTimeStartDescription}
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>{errors.workTimeStart}</FormErrorMessage>
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
                <FormControl>
                  <FormLabel>{placeholders.impactTimeStartLabel}</FormLabel>
                  <Input
                    type="date"
                    name="impactTimeStart"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.impactTimeStart}
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
                  />
                  {!errors.impactTimeEnd ? (
                    <FormHelperText>
                      {placeholders.impactTimeEndLabel}
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>{errors.impactTimeEnd}</FormErrorMessage>
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
              <FormControl isRequired>
                <Flex>
                  <FormLabel>{placeholders.impactScopesLabel}</FormLabel>
                  <ErrorMessage name="impactScopes" render={DisplayError} />
                </Flex>
                <Field name="impactScopes">
                  {({ form }: FieldProps) => (
                    <ImpactScopesAutoComplete
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
              <Button
                width="100%"
                type="submit"
                disabled={!isValid || isSubmitting}
                colorScheme="green"
              >
                {buttons.submit}
              </Button>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

const DisplayError = (message: string) => (
  <span style={{ color: "red" }}>- {message}</span>
);

export default ClaimHypercertPage;
