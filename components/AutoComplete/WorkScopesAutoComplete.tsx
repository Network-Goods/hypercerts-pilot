import { AutoComplete, AutoCompleteProps } from "./AutoComplete";
import { useWorkScopes } from "../../hooks/listWorkscopes";
import { Option } from "chakra-ui-simple-autocomplete";
import { useDisclosure } from "@chakra-ui/react";
import { AddWorkscopeModal } from "../Modals/AddWorkscopeModal";

export const WorkScopesAutoComplete = ({
  onChange,
}: Pick<AutoCompleteProps, "onChange">) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: workscopeData, loading: workscopesLoading } = useWorkScopes();
  const workscopeOptions: Option[] =
    workscopeData?.workScopes.map((w) => ({ label: w.text, value: w.id })) ||
    [];

  return (
    <>
      <AutoComplete
        options={workscopeOptions}
        onChange={onChange}
        onOpen={onOpen}
        loading={workscopesLoading}
      />
      <AddWorkscopeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
