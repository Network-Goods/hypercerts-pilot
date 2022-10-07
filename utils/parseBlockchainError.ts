import { useHypercertContract } from "../hooks/contracts";

export const useParseBlockchainError = () => {
  const contract = useHypercertContract();
  return (e: any, fallbackMessage: string) => {
    const unparsedErrorData = e?.error?.data?.originalError?.data;
    const errorData = contract?.interface?.parseError(unparsedErrorData);

    if (errorData) {
      console.log("Blockchain error", errorData);
      return errorData.errorFragment.name;
    }

    console.log("Trouble parsing error", { ...e });

    return (
      e?.reason?.replace("execution reverted: ", "") ||
      e?.error?.data?.data?.message ||
      e?.error?.data?.message ||
      e?.message ||
      fallbackMessage
    );
  };
};
