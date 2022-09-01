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
import { addImpactScopeModal } from "../../content/claim-hypercert-content";
import { formatScope } from "../../utils/formatting";

export const AddImpactScopeModal = ({
  isOpen,
  onClose,
}: Omit<ModalProps, "children">) => {
  const contract = useHypercertContract();
  const toast = useToast();
  const [value, setValue] = useState<string>();
  const [addingScope, setAddingScope] = useState(false);
  const { mutate } = useWriteContract(contract, "addImpactScope", {
    onError: (error) => {
      toast({
        description: parseBlockchainError(
          error,
          addImpactScopeModal.toastError
        ),
        status: "error",
      });
      console.error(error);
    },
    onConfirmation: (receipt) => {
      toast({
        description: addImpactScopeModal.toastSuccess(receipt.transactionHash),
        status: "success",
      });
      setAddingScope(false);
      onClose();
    },
  });

  const onConfirm = async () => {
    setAddingScope(true);
    if (value) {
      const formattedValue = formatScope(value);
      setValue(formattedValue);
      await mutate(formattedValue);
    }
    setAddingScope(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center">
            {addImpactScopeModal.title}
            {addingScope && <Spinner ml={3} />}
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Input
            value={value}
            disabled={addingScope}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder={addImpactScopeModal.placeholder}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            colorScheme="green"
            onClick={onConfirm}
            disabled={!value || addingScope}
          >
            {addImpactScopeModal.submit}
          </Button>
          <Button disabled={addingScope} onClick={onClose}>
            {addImpactScopeModal.close}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
