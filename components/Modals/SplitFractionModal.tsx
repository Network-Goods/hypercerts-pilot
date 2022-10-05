import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Button,
  Text,
} from "@chakra-ui/react";
import { splitFractionModal } from "../../content/split-hypercert-content";

export const SplitFractionModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalHeader>{splitFractionModal.title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>{splitFractionModal.body}</Text>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="green" mr={3} onClick={onClose}>
          {splitFractionModal.confirmButton}
        </Button>
        <Button variant="ghost">{splitFractionModal.closeButton}</Button>
      </ModalFooter>
    </Modal>
  );
};
