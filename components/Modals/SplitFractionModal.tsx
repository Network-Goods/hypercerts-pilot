import { useEffect, useState } from "react";
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
  Textarea,
  useDisclosure, useToast
} from "@chakra-ui/react";
import { splitFractionModal } from "../../content/split-hypercert-content";
import { useFractionById } from "../../hooks/fractions";
import { useSplitFraction } from "../../hooks/split";
import _ from "lodash";
import { useHypercertFractions } from "../../hooks/useHypercert";
import { useWallet } from "@raidguild/quiver";

type C = (args: { onClick: () => void }) => JSX.Element;

export const SplitFractionModal = ({
  render,
  tokenId,
  hypercertId,
}: {
  render: C;
  tokenId: string;
  hypercertId: string;
}) => {
  const { address } = useWallet();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { startPolling } = useHypercertFractions(hypercertId);

  const [step, setStep] = useState<"input" | "splitting" | "complete">("input");
  const [value, setValue] = useState("");

  const { data, loading } = useFractionById(tokenId);
  const split = useSplitFraction({
    onComplete: () => {
      setStep("complete");
      startPolling(5000);
    },
    onError: () => {
      setStep("input");
    },
  });

  const [totalValue, setTotalValue] = useState(0);

  const fractionValue = data?.hypercertFraction?.units;

  const formatValues = (s: string) => {
    return s
      .split(",")
      .map((x) => x.trim())
      .map((x) => parseInt(x, 10));
  };

  useEffect(() => {
    setValue(fractionValue);
    setTotalValue(_.sum(formatValues(fractionValue || "")));
  }, [fractionValue]);

  if (loading || !data?.hypercertFraction) return null;

  const close = () => {
    setStep("input");
    onClose();
  };

  const onClickSplit = async () => {
    if (!address) {
      toast({
        description: splitFractionModal.error.noWalletConnected,
        status: 'error'
      });
      return;
    }
    setStep("splitting");
    const formattedValues = formatValues(value);
    await split(address, tokenId, formattedValues);
  };

  const fractionUnits = parseInt(data?.hypercertFraction?.units, 10);
  const valueIncorrect = totalValue !== fractionUnits || isNaN(totalValue);

  const onlyOneFraction = value?.split(",").length === 1;
  const disabled = valueIncorrect || onlyOneFraction;

  const getErrorMessage = () => {
    if (isNaN(totalValue)) {
      return splitFractionModal.define.notANumber;
    }

    if (formatValues(value).some((x) => x <= 0)) {
      return splitFractionModal.define.noNegativeValues;
    }

    if (!isNaN(totalValue) && onlyOneFraction) {
      return splitFractionModal.define.notOneValue;
    }

    if (!data.hypercertFraction) {
      return null;
    }

    if (!onlyOneFraction && totalValue > data.hypercertFraction.units) {
      return splitFractionModal.define.valueTooHigh;
    }

    if (!onlyOneFraction && totalValue < data.hypercertFraction.units) {
      return splitFractionModal.define.valueTooLow;
    }
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
                <Text mb={4}>
                  {splitFractionModal.define.body(
                    data.hypercertFraction.units,
                    data.hypercertFraction.hypercert.totalUnits
                  )}
                </Text>

                {valueIncorrect || onlyOneFraction ? (
                  <Alert borderRadius="sm" my={4} status="error">
                    <AlertIcon />
                    <AlertTitle>{getErrorMessage()}</AlertTitle>
                  </Alert>
                ) : (
                  <Alert borderRadius="sm" my={4} status="success">
                    <AlertIcon />
                    <AlertTitle>{splitFractionModal.define.ready}</AlertTitle>
                  </Alert>
                )}
                <Textarea
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setTotalValue(_.sum(formatValues(e.target.value || "")));
                  }}
                />
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={close}>
                  {splitFractionModal.define.closeButton}
                </Button>
                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={onClickSplit}
                  disabled={disabled}
                >
                  {splitFractionModal.define.confirmButton}
                </Button>
              </ModalFooter>
            </>
          )}
          {step === "splitting" && (
            <>
              <ModalHeader>{splitFractionModal.splitting.title}</ModalHeader>
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
              <ModalHeader>{splitFractionModal.complete.title}</ModalHeader>
              <ModalCloseButton />
              <ModalFooter>
                <Button colorScheme="green" mr={3} onClick={onClose}>
                  {splitFractionModal.complete.confirmButton}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
