import { AutoComplete, AutoCompleteProps, Option } from "./AutoComplete";
import { useWorkScopes } from "../../hooks/listWorkscopes";
import { useDisclosure } from "@chakra-ui/react";
import { AddWorkscopeModal } from "../Modals/AddWorkscopeModal";
import { placeholders } from "../../content/claim-hypercert-content";

export const WorkScopesAutoComplete = ({
  onChange,
  disabled,
  value,
}: Pick<AutoCompleteProps, "onChange" | "disabled" | "value">) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: workScopeData, isLoading: workScopesLoading } = useWorkScopes();
  const workscopeOptions: Option[] =
    workScopeData?.map((w) => ({ label: w, value: w })) || [];

  return (
    <>
      <AutoComplete
        value={value}
        options={workscopeOptions}
        onChange={onChange}
        onOpenAddModal={onOpen}
        loading={workScopesLoading}
        placeholder={placeholders.workScopes}
        instanceId="work-scopes-autocomplete"
        disabled={disabled}
      />
      <AddWorkscopeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
