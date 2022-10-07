import { Button, Flex } from "@chakra-ui/react";
import Select, { Props } from "react-select";
import makeAnimated from "react-select/animated";

export interface Option {
  label: string;
  value: string;
}

export interface AutoCompleteProps {
  options: Option[];
  onChange: (options: Option[]) => void;
  onOpenAddModal: () => void;
  loading: boolean;
  placeholder: string;
  // Necessary for resolving ssr issues
  instanceId: string;
  disabled: boolean;
  value?: Props["value"];
}

const animatedComponents = makeAnimated();

export const AutoComplete = ({
  options,
  onChange,
  onOpenAddModal,
  loading,
  placeholder,
  instanceId,
  disabled,
  value,
}: AutoCompleteProps) => {
  return (
    <Flex>
      <Select
        value={value}
        isDisabled={disabled}
        instanceId={instanceId}
        options={options}
        isLoading={loading}
        isMulti
        components={animatedComponents}
        onChange={(values) => onChange(values as Option[])}
        placeholder={placeholder}
        styles={{
          container: (styles) => ({
            ...styles,
            width: "100%",
          }),
        }}
      />

      <Button
        colorScheme="green"
        marginLeft={3}
        onClick={onOpenAddModal}
        height="38px"
        disabled={disabled}
      >
        Add
      </Button>
    </Flex>
  );
};
