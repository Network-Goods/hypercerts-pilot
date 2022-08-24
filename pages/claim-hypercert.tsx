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
} from "@chakra-ui/react";
import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
import { useState } from "react";
import { ConnectWallet } from "../components/ConnectWallet";

const options = [
  { value: "Tree-planting", label: "referrals" },
  { value: "Spain", label: "Spain" },
  { value: "volunteer labor", label: "volunteer labor" },
  { value: "financial support", label: "financial support" },
  { value: "material support", label: "material support" },
  { value: "referrals", label: "referrals" },
];

const TestPage: NextPage = () => {
  const [result, setResult] = useState<Option[]>([]);
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

            image: "",
            format_version: 0.1,
            prev_hypercert: "",
            creators: [],
            workTimeStart: 0,
            workTimeEnd: 0,
            impactTimeStart: 0,
            impactTimeEnd: 0,
            workScopes: [],
            rights: [],
            uri: "",
          }}
          onSubmit={(val) => {
            /**
             * Steps:
             * 1. (optional) Upload image to IPFS and get the cid for the image
             * 2. Create the metadata json and upload to IPFS as file, including the (optional) cid for the image
             * 3. Call the mint function on the contract with the required parameters, including the cid for the metadata json.
             */
            console.log(val);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
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
                  name=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.external_link}
                  placeholder="External link with more information"
                />
                {errors.external_link && (
                  <FormErrorMessage>{errors.external_link}</FormErrorMessage>
                )}
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
                  <FormErrorMessage>{errors.workScopes}</FormErrorMessage>
                )}
              </FormControl>
              <Divider my={3} />
              <Button width="100%" type="submit" disabled={!isSubmitting}>
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
