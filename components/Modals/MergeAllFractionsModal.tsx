import { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
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
import { BigNumber } from "ethers";
import { useHypercertFractions } from "../../hooks/useHypercert";

type C = (args: { onClick: () => void }) => JSX.Element;

export const MergeAllFractionsModal = ({
  render,
  fractionIds,
  hypercertId,
}: {
  render: C;
  fractionIds: string[];
  hypercertId: string;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { startPolling } = useHypercertFractions(hypercertId);

  const merge = useMergeFractions({
    onComplete: () => {
      setStep("complete");
      startPolling(5000);
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
    const parsedFractions = fractionIds.map((x) =>
      BigNumber.from(x).toNumber()
    );
    console.log("Merging tokens with id", parsedFractions);
    setStep("merging");
    await merge(parsedFractions);
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
                <Alert mt={4} status="warning">
                  <AlertIcon />
                  <AlertTitle>Merging has been temporarily disabled</AlertTitle>
                </Alert>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={close}>
                  {mergeHypercertModalContent.confirmation.closeButton}
                </Button>
                <Button colorScheme="green" mr={3} onClick={onConfirm} disabled>
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
