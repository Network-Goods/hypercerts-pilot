import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Flex, Image } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { placeholders } from "../content/claim-hypercert-content";

export const ImageUploadField = ({
  setFieldValue,
  name,
  disabled,
}: {
  setFieldValue: any;
  name: string;
  disabled: boolean;
}) => {
  const [file, setFile] = useState<(File & { preview: string }) | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFile(null);
    setFieldValue(name, null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const acceptedFile = acceptedFiles[0];
      setFile(
        Object.assign(acceptedFile, {
          preview: URL.createObjectURL(acceptedFile),
        })
      );
      setFieldValue(name, acceptedFile);
    },
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
  });

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, []);

  return (
    <Flex
      borderRadius={6}
      justifyContent="center"
      alignItems="center"
      border="1px solid rgb(226, 232, 240)"
      cursor="pointer"
      p={4}
    >
      <div {...getRootProps({ className: "dropzone" })}>
        <input disabled={disabled} ref={inputRef} {...getInputProps()} />
        {file && (
          <Flex>
            <CloseIcon
              ml="auto"
              onClick={(e) => {
                if (!disabled) {
                  e.stopPropagation();
                  reset();
                }
              }}
            />
          </Flex>
        )}
        {file ? (
          <Image
            alt="Preview of the chosen image for the hypercert"
            src={file.preview}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        ) : (
          <p>{placeholders.uploadImage}</p>
        )}
      </div>
    </Flex>
  );
};
