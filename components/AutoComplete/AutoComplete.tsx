import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
import { Badge, Button, Flex, Spinner } from "@chakra-ui/react";
import { placeholders } from "../../content/claim-hypercert-content";
import { useState } from "react";

export interface AutoCompleteProps {
  options: Option[];
  onChange: (options: Option[]) => void;
  onOpen: () => void;
  loading: boolean;
}

export const AutoComplete = ({
  options,
  onChange,
  onOpen,
  loading,
}: AutoCompleteProps) => {
  const [result, setResult] = useState<Option[]>([]);
  return (
    <Flex>
      {loading ? (
        <Spinner />
      ) : (
        <Autocomplete
          allowCreation={false}
          renderBadge={(option) => (
            <Badge mr={3} cursor="pointer">
              {option.label} <b>x</b>
            </Badge>
          )}
          options={options}
          result={result}
          setResult={(os) => {
            onChange(os);
            setResult(os);
          }}
          width="100%"
          style={{
            flexGrow: 1,
          }}
          placeholder={placeholders.workScopes}
        />
      )}
      <Button colorScheme="green" marginLeft="auto" onClick={onOpen}>
        Add
      </Button>
    </Flex>
  );
};
