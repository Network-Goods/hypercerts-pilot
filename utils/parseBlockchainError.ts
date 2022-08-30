export const parseBlockchainError = (e: any, fallbackMessage: string) => {
  // console.log("received error", { ...e });
  return (
    e?.error?.data?.data?.message ||
    e?.error?.data?.message ||
    e?.message ||
    fallbackMessage
  );
};
