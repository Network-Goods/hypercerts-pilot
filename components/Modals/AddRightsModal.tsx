import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useHypercertContract } from "../../hooks/contracts";
import { useWriteContract } from "@raidguild/quiver";
import { parseBlockchainError } from "../../utils/parseBlockchainError";
import { useState } from "react";
import { addRightModal } from "../../content/claim-hypercert-content";
import { formatScope } from "../../utils/formatting";
import { useRights } from "../../hooks/listRights";

export const AddRightsModal = ({
  isOpen,
  onClose,
}: Omit<ModalProps, "children">) => {
  const contract = useHypercertContract();
  const toast = useToast();
  const { startPolling } = useRights();
  const [value, setValue] = useState<string>("");
  const [addingRight, setAddingRight] = useState(false);
  const { mutate } = useWriteContract(contract, "addRight", {
    onError: (error) => {
      toast({
        description: parseBlockchainError(error, addRightModal.toastError),
        status: "error",
      });
      console.error(error);
    },
    onConfirmation: (receipt) => {
      toast({
        description: addRightModal.toastSuccess(receipt.transactionHash),
        status: "success",
        isClosable: true,
      });
      setAddingRight(false);
      onClose();
    },
  });

  const onConfirm = async () => {
    setAddingRight(true);
    if (value) {
      const formattedValue = formatScope(value);
      setValue(formattedValue);
      await mutate(formattedValue);
    }
    setAddingRight(false);
    startPolling(5000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center">
            {addRightModal.title}
            {addingRight && <Spinner ml={3} />}
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Input
            value={value}
            disabled={addingRight}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder={addRightModal.placeholder}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            colorScheme="green"
            onClick={onConfirm}
            disabled={!value || addingRight}
          >
            {addRightModal.submit}
          </Button>
          <Button disabled={addingRight} onClick={onClose}>
            {addRightModal.close}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
