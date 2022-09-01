import { AutoComplete, AutoCompleteProps } from "./AutoComplete";
import { Option } from "chakra-ui-simple-autocomplete";
import { useDisclosure } from "@chakra-ui/react";
import { useRights } from "../../hooks/listRights";
import { AddRightsModal } from "../Modals/AddRightsModal";

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
        onOpen={onOpen}
        loading={rightsLoading}
      />
      <AddRightsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
