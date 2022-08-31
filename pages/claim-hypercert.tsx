import type { NextPage } from "next";
import { ErrorMessage, Field, FieldProps, Formik } from "formik";
import {
  Badge,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
import { useState } from "react";
import { UploadField } from "../components/UploadField";
import { uploadCertificateToIpfs } from "../utils/ipfsClient";
import { useWallet } from "@raidguild/quiver";
import { useMintHyperCertificate } from "../hooks/mint";
import { useWorkScopes } from "../hooks/listWorkscopes";
import * as Yup from "yup";
import { AddWorkscopeModal } from "../components/AddWorkscopeModal";
import { FORMAT_VERSION } from "../constants";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mintHyperCertificate = useMintHyperCertificate();
  const { data: workscopeData, loading: workscopesLoading } = useWorkScopes();
  const autocompleteOptions: Option[] =
    workscopeData?.workScopes.map((w) => ({ label: w.text, value: w.id })) ||
    [];
  const [result, setResult] = useState<Option[]>([]);
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
            description: "starting certificate metadata upload to ipfs",
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
              description: `Certificate uploaded successfully to ipfs, cid: ${certificateMetadataIpfsId}`,
              status: "success",
            });
          } catch (error) {
            toast({
              description:
                "Something went wrong while uploading the image file to ipfs",
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
              description: "Minting certificate",
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
              description: "Something went wrong while minting the certificate",
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
                  placeholder="Human-readable name for the certificate"
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
                  placeholder="Description for the certificate"
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
                  placeholder="External link with more information"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <UploadField name="image" setFieldValue={setFieldValue} />
              </FormControl>
              <Divider my={3} />
              <HStack>
                <FormControl>
                  <FormLabel>Work time start</FormLabel>
                  <Input
                    type="datetime-local"
                    name="workTimeStart"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.workTimeStart}
                  />
                  {!errors.workTimeStart ? (
                    <FormHelperText>
                      The moment at which work started
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>{errors.workTimeStart}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Work time end</FormLabel>
                  <Input
                    type="datetime-local"
                    name="workTimeEnd"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.workTimeEnd}
                  />
                  {!errors.workTimeEnd ? (
                    <FormHelperText>
                      The moment at which work ended
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>{errors.workTimeEnd}</FormErrorMessage>
                  )}
                </FormControl>
              </HStack>
              <Divider my={3} />
              <HStack>
                <FormControl>
                  <FormLabel>Impact time start</FormLabel>
                  <Input
                    type="datetime-local"
                    name="impactTimeStart"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.impactTimeStart}
                  />
                  {!errors.impactTimeStart ? (
                    <FormHelperText>
                      The moment at which impact started
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>
                      {errors.impactTimeStart}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Impact time end</FormLabel>
                  <Input
                    type="datetime-local"
                    name="impactTimeEnd"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.impactTimeEnd}
                  />
                  {!errors.impactTimeEnd ? (
                    <FormHelperText>
                      The moment at which impact ended
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>{errors.impactTimeEnd}</FormErrorMessage>
                  )}
                </FormControl>
              </HStack>
              <Divider my={3} />
              {!workscopesLoading && (
                <FormControl isRequired>
                  <Flex>
                    <FormLabel>Work scopes</FormLabel>
                    <ErrorMessage name="workScopes" render={DisplayError} />
                  </Flex>
                  <Field name="workScopes">
                    {({ form }: FieldProps) => (
                      <Flex>
                        <Autocomplete
                          allowCreation={false}
                          renderBadge={(option) => (
                            <Badge mr={3} cursor="pointer">
                              {option.label} <b>x</b>
                            </Badge>
                          )}
                          options={autocompleteOptions}
                          result={result}
                          setResult={(options: Option[]) => {
                            form.setFieldValue("workScopes", options);
                            setResult(options);
                          }}
                          width="100%"
                          style={{
                            flexGrow: 1,
                          }}
                          placeholder="Click to start searching for work scopes"
                        />
                        <Button
                          colorScheme="green"
                          marginLeft="auto"
                          onClick={onOpen}
                        >
                          Add
                        </Button>
                      </Flex>
                    )}
                  </Field>
                  {!errors.workScopes ? (
                    <FormHelperText>
                      The different scopes that are encapsulated by this
                      certificate
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>Workscopes errors</FormErrorMessage>
                  )}
                </FormControl>
              )}
              <Divider my={3} />
              <Button
                width="100%"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Claim hypercert
              </Button>
              <AddWorkscopeModal isOpen={isOpen} onClose={onClose} />
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
