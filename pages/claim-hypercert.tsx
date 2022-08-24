import type { NextPage } from "next";
import { Field, FieldProps, Formik } from "formik";
import {
  Badge,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
import { useState } from "react";
import { ConnectWallet } from "../components/ConnectWallet";
import { UploadComponent } from "../components/DropZone";
import { uploadImage, uploadJson } from "../utils/ipfsClient";
import { MetaData } from "../types/MetaData";
import { useWallet } from "@raidguild/quiver";
import { useMintHyperCertificate } from "../hooks/mint";

const options: Option[] = [
  { value: "0", label: "referrals" },
  { value: "1", label: "Spain" },
  { value: "2", label: "volunteer labor" },
  { value: "3", label: "financial support" },
  { value: "4", label: "material support" },
  { value: "5", label: "referrals" },
];

const TestPage: NextPage = () => {
  const { address } = useWallet();
  const mintHyperCertificate = useMintHyperCertificate();
  const [result, setResult] = useState<Option[]>([]);
  const toast = useToast();
  return (
    <>
      <Container>
        <Center mt={3}>
          <ConnectWallet />
        </Center>
        <Text textAlign="center" style={{ fontSize: 30 }}>
          Claim hypercert
        </Text>
        <Formik
          initialValues={{
            name: "",
            description: "",
            external_link: "",
            image: null as File | null,

            format_version: 0.1,
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

            // Upload image to ipfs
            let ipfsImageCid: string | undefined;
            if (val.image) {
              toast({
                description: "starting image file upload to ipfs",
                status: "info",
              });
              try {
                const imageMetadata = await uploadImage(
                  `image-${val.name}`,
                  `Cover image for ${val.name}`,
                  val.image
                );
                ipfsImageCid = imageMetadata.ipnft;
                toast({
                  description: `Image uploaded successfully to ipfs, cid: ${ipfsImageCid}`,
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
            }

            // Create and upload metadata json
            let ipfsJsonId: string | undefined;
            const metaData: MetaData = {
              description: val.description,
              external_link: val.external_link,
              image: ipfsImageCid,
              format_version: val.format_version,
              name: val.name,
              prev_hypercert: val.prev_hypercert,
              refs: [],
            };
            toast({
              description: "Starting upload of metadata json to ipfs",
              status: "info",
            });
            try {
              ipfsJsonId = await uploadJson(metaData);
              toast({
                description: `Uploaded metadata json to ipfs with cid ${ipfsJsonId}`,
                status: "success",
              });
            } catch (error) {
              toast({
                description:
                  "Something went wrong while uploading the metadata json to ipfs",
                status: "error",
              });
              console.error(error);
              return;
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
                uri: ipfsJsonId!,
                rightsIds: val.rights,
                impactScopeIds: val.workScopes.map((s) => parseInt(s.value)),
                workScopeIds: [],
              });
              toast({
                description: "Minted certificate!",
                status: "success",
              });
            } catch (error) {
              toast({
                description:
                  "Something went wrong while minting the certifcate",
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Certificate name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Human-readable name for the certificate"
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Description for the certificate"
                  size="sm"
                />
                {errors.description && (
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>External link</FormLabel>
                <Input
                  type="text"
                  name="external_link"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.external_link}
                  placeholder="External link with more information"
                />
                {errors.external_link && (
                  <FormErrorMessage>{errors.external_link}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <UploadComponent name="image" setFieldValue={setFieldValue} />
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
              <FormControl>
                <FormLabel>Work scopes</FormLabel>
                <Field name="workScopes">
                  {({ form }: FieldProps) => (
                    <Autocomplete
                      renderBadge={(option) => (
                        <Badge mr={3}>
                          {option.label} <b>x</b>
                        </Badge>
                      )}
                      options={options}
                      result={result}
                      setResult={(options: Option[]) => {
                        form.setFieldValue("workScopes", options);
                        setResult(options);
                      }}
                      placeholder="Click to start searching for work scopes"
                    />
                  )}
                </Field>{" "}
                {!errors.workScopes ? (
                  <FormHelperText>
                    The different scopes that are encapsulated by this
                    certificate
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Workscopes errors</FormErrorMessage>
                )}
              </FormControl>
              <Divider my={3} />
              <Button width="100%" type="submit">
                Claim hypercert
              </Button>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default TestPage;
