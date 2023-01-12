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
import { useHypercertInfo } from "../../hooks/useHypercert";
import { useBurnFraction } from "../../hooks/burn";
import { burnFractionModal } from "../../content/burn-hypercert-content";
import { formatFractionPercentage } from "../../utils/formatting";
import { useRouter } from "next/router";
import { useFractionById } from "../../hooks/fractions";

type C = (args: { onClick: () => void }) => JSX.Element;

export const BurnFractionModal = ({
  render,
  tokenId,
  hypercertId,
}: {
  render: C;
  tokenId: string;
  hypercertId: string;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { push } = useRouter();

  const { data: hypercertInfo, loading: loadingHypercertInfo } =
    useHypercertInfo(hypercertId);

  const [step, setStep] = useState<"confirm" | "burning" | "complete">(
    "confirm"
  );

  const { data, isLoading } = useFractionById(tokenId);
  const split = useBurnFraction({
    onComplete: async () => {
      setStep("complete");
      await push({ pathname: "/my-hypercerts", query: { withPolling: true } });
    },
    onError: () => {
      setStep("confirm");
    },
  });

  if (isLoading || loadingHypercertInfo || !data?.claimToken || !hypercertInfo)
    return null;

  const close = () => {
    setStep("confirm");
    onClose();
  };

  const onClickBurn = async () => {
    setStep("burning");
    await split(tokenId, 0);
  };

  const disabled = false;

  return (
    <>
      {render({ onClick: onOpen })}
      <Modal isOpen={isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          {step === "confirm" && (
            <>
              <ModalHeader>{burnFractionModal.confirm.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text mb={4}>
                  {burnFractionModal.confirm.body(
                    data.claimToken.units,
                    formatFractionPercentage(
                      data.claimToken.units,
                      data.claimToken.claim.totalUnits
                    )
                  )}
                  {" '"}
                  <b>{hypercertInfo.name}</b>
                  {"'."}
                </Text>
                {disabled && (
                  <Alert mt={4} status="warning">
                    <AlertIcon />
                    <AlertTitle>
                      Burning has been temporarily disabled
                    </AlertTitle>
                  </Alert>
                )}
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={close}>
                  {burnFractionModal.confirm.closeButton}
                </Button>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={onClickBurn}
                  disabled={disabled}
                >
                  {burnFractionModal.confirm.confirmButton}
                </Button>
              </ModalFooter>
            </>
          )}
          {step === "burning" && (
            <>
              <ModalHeader>{burnFractionModal.confirm.title}</ModalHeader>
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
              <ModalHeader>{burnFractionModal.confirm.title}</ModalHeader>
              <ModalCloseButton />
              <ModalFooter>
                <Button colorScheme="green" mr={3} onClick={onClose}>
                  {burnFractionModal.complete.confirmButton}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
