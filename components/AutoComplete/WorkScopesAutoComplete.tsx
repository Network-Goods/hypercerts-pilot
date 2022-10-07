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
  const { data: workscopeData, loading: workscopesLoading } = useWorkScopes();
  const workscopeOptions: Option[] =
    workscopeData?.workScopes.map((w) => ({ label: w.text, value: w.id })) ||
    [];

  return (
    <>
      <AutoComplete
        value={value}
        options={workscopeOptions}
        onChange={onChange}
        onOpenAddModal={onOpen}
        loading={workscopesLoading}
        placeholder={placeholders.workScopes}
        instanceId="work-scopes-autocomplete"
        disabled={disabled}
      />
      <AddWorkscopeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
