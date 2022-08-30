import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useToast,
} from "@chakra-ui/react";
import { useHypercertContract } from "../hooks/contracts";
import { useWriteContract } from "@raidguild/quiver";
import { parseBlockchainError } from "../utils/parseBlockchainError";
import { useState } from "react";

export const AddWorkscopeModal = ({
  isOpen,
  onClose,
}: Omit<ModalProps, "children">) => {
  const contract = useHypercertContract();
  const toast = useToast();
  const [value, setValue] = useState<string>();
  const { mutate } = useWriteContract(contract, "addWorkScope", {
    onError: (error) => {
      toast({
        description: parseBlockchainError(
          error,
          "Something went wrong while adding the workscope certificate"
        ),
        status: "error",
      });
      console.error(error);
    },
    onConfirmation: (receipt) => {
      toast({
        description: `Workscope ${receipt.transactionHash} successfully added`,
        status: "success",
      });
    },
  });

  const onConfirm = async () => {
    if (value) {
      const formattedValue = value.toLowerCase().replaceAll(" ", "-").trim();
      await mutate(formattedValue);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new work scope</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder="New workscope name"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            colorScheme="green"
            onClick={onConfirm}
            disabled={!value}
          >
            Confirm
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
