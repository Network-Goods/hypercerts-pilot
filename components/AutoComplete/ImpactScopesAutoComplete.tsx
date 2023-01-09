import { AutoComplete, AutoCompleteProps, Option } from "./AutoComplete";
import { useDisclosure } from "@chakra-ui/react";
import { useImpactScopes } from "../../hooks/listImpactScopes";
import { AddImpactScopeModal } from "../Modals/AddImpactscopeModal";
import { placeholders } from "../../content/claim-hypercert-content";

export const ImpactScopesAutoComplete = ({
  onChange,
  disabled,
  value,
}: Pick<AutoCompleteProps, "onChange" | "disabled" | "value">) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: impactScopeData, isLoading: impactScopesLoading } =
    useImpactScopes();
  const impactScopeOption: Option[] =
    impactScopeData?.map((w) => ({
      label: w,
      value: w,
    })) || [];

  return (
    <>
      <AutoComplete
        value={value}
        options={impactScopeOption}
        onChange={onChange}
        onOpenAddModal={onOpen}
        loading={impactScopesLoading}
        placeholder={placeholders.impactScopes}
        instanceId="impact-scopes-autocomplete"
        disabled={disabled}
      />
      <AddImpactScopeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
