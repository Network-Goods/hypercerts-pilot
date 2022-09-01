import { AutoComplete, AutoCompleteProps } from "./AutoComplete";
import { Option } from "chakra-ui-simple-autocomplete";
import { useDisclosure } from "@chakra-ui/react";
import { useImpactScopes } from "../../hooks/listImpactScopes";
import { AddImpactScopeModal } from "../Modals/AddImpactscopeModal";

export const ImpactScopesAutoComplete = ({
  onChange,
}: Pick<AutoCompleteProps, "onChange">) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: impactScopeData, loading: impactScopesLoading } =
    useImpactScopes();
  const impactScopeOption: Option[] =
    impactScopeData?.impactScopes.map((w) => ({
      label: w.text,
      value: w.id,
    })) || [];

  return (
    <>
      <AutoComplete
        options={impactScopeOption}
        onChange={onChange}
        onOpen={onOpen}
        loading={impactScopesLoading}
      />
      <AddImpactScopeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
