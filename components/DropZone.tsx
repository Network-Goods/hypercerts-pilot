import React from "react";
import { useDropzone } from "react-dropzone";
import { Box, Flex } from "@chakra-ui/react";
import Accept from "react-dropzone/typings/tests/accept";

export const UploadComponent = ({
  setFieldValue,
  name,
}: {
  setFieldValue: any;
  name: string;
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFieldValue(name, acceptedFiles[0]);
    },
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
  });
  return (
    <Flex
      borderRadius={6}
      justifyContent="center"
      alignItems="center"
      border="1px dotted blue"
      p={4}
    >
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
    </Flex>
  );
};
