import { useState } from "react";
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { mergeHypercertModalContent } from "../../content/merge-hypercert-content";
import { splitFractionModal } from "../../content/split-hypercert-content";

type C = (args: { onClick: () => void }) => JSX.Element;

export const SplitFractionModal = ({ render }: { render: C }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [step, setStep] = useState<"input" | "splitting" | "complete">("input");

  const close = () => {
    setStep("input");
    onClose();
  };

  const onConfirm = () => {
    setStep("splitting");
  };

  return (
    <>
      {render({ onClick: onOpen })}
      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          {step === "input" && (
            <>
              <ModalHeader>{splitFractionModal.define.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text mb={4}>{splitFractionModal.define.body}</Text>
                <Textarea />
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={close}>
                  {splitFractionModal.define.closeButton}
                </Button>
                <Button colorScheme="green" mr={3} onClick={onConfirm}>
                  {splitFractionModal.define.confirmButton}
                </Button>
              </ModalFooter>
            </>
          )}
          {step === "splitting" && (
            <>
              <ModalHeader>
                {mergeHypercertModalContent.merging.title}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Center my={6}>
                  <Spinner />
                </Center>
              </ModalBody>
            </>
          )}
          {step === "complete" && (
            <>
              <ModalHeader>
                {mergeHypercertModalContent.complete.title}
              </ModalHeader>
              <ModalCloseButton />
              <ModalFooter>
                <Button colorScheme="green" mr={3} onClick={onClose}>
                  {mergeHypercertModalContent.complete.confirmButton}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
