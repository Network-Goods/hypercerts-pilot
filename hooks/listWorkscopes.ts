import { Option } from "chakra-ui-simple-autocomplete";

const options: Option[] = [
  { value: "0", label: "referrals" },
  { value: "1", label: "Spain" },
  { value: "2", label: "volunteer labor" },
  { value: "3", label: "financial support" },
  { value: "4", label: "material support" },
  { value: "5", label: "referrals" },
];

export const useWorkScopes = () => {
  return options;
};
