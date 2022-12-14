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
// import { useHypercertContract } from "../../hooks/contracts";
// import { useWriteContract } from "@raidguild/quiver";
import { useState } from "react";
import { addImpactScopeModal } from "../../content/claim-hypercert-content";
import { formatScope } from "../../utils/formatting";
import { useImpactScopes } from "../../hooks/listImpactScopes";
// import { useParseBlockchainError } from "../../utils/parseBlockchainError";

export const AddImpactScopeModal = ({
  isOpen,
  onClose,
}: Omit<ModalProps, "children">) => {
  // const contract = useHypercertContract();
  const toast = useToast();
  // const parseBlockchainError = useParseBlockchainError();
  const [value, setValue] = useState<string>("");
  const [addingScope, setAddingScope] = useState(false);

  // TODO: Update to the new method for creating impact scopes
  const mutate = async (formattedValue: string) => {
    toast({
      description: `Creating impact scopes is currently not implemented, could not add ${formattedValue}`,
      status: "error",
    });
  };
  // const { mutate } = useWriteContract(contract, "addImpactScope", {
  //   onError: (error) => {
  //     toast({
  //       description: parseBlockchainError(
  //         error,
  //         addImpactScopeModal.toastError
  //       ),
  //       status: "error",
  //     });
  //     console.error(error);
  //   },
  //   onConfirmation: (receipt) => {
  //     toast({
  //       description: addImpactScopeModal.toastSuccess(
  //         value,
  //         receipt.transactionHash
  //       ),
  //       status: "success",
  //       isClosable: true,
  //     });
  //     setAddingScope(false);
  //     onClose();
  //   },
  // });

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
