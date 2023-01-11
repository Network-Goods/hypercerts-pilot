import React, { PropsWithChildren, useContext, useState } from "react";
import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";

type StepDescriptions = Record<string, string>;

interface IContractInteractionModalProvider {
  showModal: (args: { stepDescriptions: StepDescriptions }) => void;
  setStep: (step: string) => void;
  hideModal: () => void;
}

const ContractInteractionModalContext =
  React.createContext<IContractInteractionModalProvider>({
    showModal: () => {},
    setStep: () => {},
    hideModal: () => {},
  });

export const ContractInteractionModalProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [showContractModal, setShowContractModal] = useState(false);
  const [stepDescriptions, setStepDescriptions] = useState<StepDescriptions>(
    {}
  );
  const [step, setStep] = useState<string>();

  const onShowModal = (args: { stepDescriptions: StepDescriptions }) => {
    setStepDescriptions(args.stepDescriptions);
    setShowContractModal(true);
  };

  const onCloseModal = () => {
    setStep(undefined);
    setStepDescriptions({});
    setShowContractModal(false);
  };

  return (
    <ContractInteractionModalContext.Provider
      value={{
        setStep,
        showModal: onShowModal,
        hideModal: onCloseModal,
      }}
    >
      {children}
      <Modal
        isOpen={showContractModal}
        onClose={onCloseModal}
        isCentered
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contract interaction</ModalHeader>
          <ModalBody>
            {Object.keys(stepDescriptions).map((key) => (
              <Text
                key={key}
                fontWeight={key === step ? 700 : 400}
                color={key === step ? "green" : undefined}
              >
                {stepDescriptions[key]}
              </Text>
            ))}
            <Center py={4}>
              <Spinner />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ContractInteractionModalContext.Provider>
  );
};

export const useContractModal = () =>
  useContext(ContractInteractionModalContext);
