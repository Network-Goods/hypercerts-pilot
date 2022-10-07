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
import { useState } from "react";
import { addWorkScopeModal } from "../../content/claim-hypercert-content";
import { formatScope } from "../../utils/formatting";
import { useWorkScopes } from "../../hooks/listWorkscopes";
import { useParseBlockchainError } from "../../utils/parseBlockchainError";

export const AddWorkscopeModal = ({
  isOpen,
  onClose,
}: Omit<ModalProps, "children">) => {
  const contract = useHypercertContract();
  const parseBlockchainError = useParseBlockchainError();
  const toast = useToast();
  const { startPolling } = useWorkScopes();
  const [value, setValue] = useState<string>("");
  const [addingScope, setAddingScope] = useState(false);
  const { mutate } = useWriteContract(contract, "addWorkScope", {
    onError: (error) => {
      toast({
        description: parseBlockchainError(error, addWorkScopeModal.toastError),
        status: "error",
      });
      console.error(error);
    },
    onConfirmation: (receipt) => {
      toast({
        description: addWorkScopeModal.toastSuccess(
          value,
          receipt.transactionHash
        ),
        status: "success",
        isClosable: true,
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
    startPolling(5000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center">
            {addWorkScopeModal.title}
            {addingScope && <Spinner ml={3} />}
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Input
            value={value}
            disabled={addingScope}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder={addWorkScopeModal.placeholder}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            colorScheme="green"
            onClick={onConfirm}
            disabled={!value || addingScope}
          >
            {addWorkScopeModal.submit}
          </Button>
          <Button disabled={addingScope} onClick={onClose}>
            {addWorkScopeModal.close}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
