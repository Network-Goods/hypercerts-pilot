export const burnInteractionLabels = {
  toastSuccess: (transactionHash: string) =>
    `Certificate ${transactionHash} successfully burned`,
  toastError: "Something went wrong while burning the certificate",
};

export const mintInteractionLabels = {
  toastSuccess: (transactionHash: string) =>
    `Certificate ${transactionHash} successfully minted`,
  toastError: "Something went wrong while minting the certificate",
};
