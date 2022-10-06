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
  useDisclosure,
} from "@chakra-ui/react";
import { mergeHypercertModalContent } from "../../content/merge-hypercert-content";
import { useMergeFractions } from "../../hooks/merge";

type C = (args: { onClick: () => void }) => JSX.Element;

export const MergeAllFractionsModal = ({
  render,
  fractionIds,
}: {
  render: C;
  fractionIds: string[];
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const merge = useMergeFractions({
    onComplete: () => {
      setStep("complete");
    },
    onError: () => {
      setStep("confirmation");
    },
  });

  const [step, setStep] = useState<"confirmation" | "merging" | "complete">(
    "confirmation"
  );

  const close = () => {
    setStep("confirmation");
    onClose();
  };

  const onConfirm = async () => {
    console.log("Merging", fractionIds);
    setStep("merging");
    await merge(fractionIds);
  };

  return (
    <>
      {render({ onClick: onOpen })}
      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          {step === "confirmation" && (
            <>
              <ModalHeader>
                {mergeHypercertModalContent.confirmation.title}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>{mergeHypercertModalContent.confirmation.body}</Text>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={close}>
                  {mergeHypercertModalContent.confirmation.closeButton}
                </Button>
                <Button colorScheme="green" mr={3} onClick={onConfirm}>
                  {mergeHypercertModalContent.confirmation.confirmButton}
                </Button>
              </ModalFooter>
            </>
          )}
          {step === "merging" && (
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
