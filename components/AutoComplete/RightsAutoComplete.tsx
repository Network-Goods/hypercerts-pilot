import { AutoComplete, AutoCompleteProps, Option } from "./AutoComplete";
import { useDisclosure } from "@chakra-ui/react";
import { useRights } from "../../hooks/listRights";
import { AddRightsModal } from "../Modals/AddRightsModal";
import { placeholders } from "../../content/claim-hypercert-content";

export const RightsAutoComplete = ({
  onChange,
}: Pick<AutoCompleteProps, "onChange">) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: rightsData, loading: rightsLoading } = useRights();
  const rightsOptions: Option[] =
    rightsData?.rights.map((w) => ({ label: w.text, value: w.id })) || [];

  return (
    <>
      <AutoComplete
        options={rightsOptions}
        onChange={onChange}
        onOpenAddModal={onOpen}
        loading={rightsLoading}
        placeholder={placeholders.rights}
        instanceId="rights-autocomplete"
      />
      <AddRightsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
