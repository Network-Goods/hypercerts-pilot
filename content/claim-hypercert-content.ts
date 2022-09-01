export const toastMessages = {
  metadataUploadStart: "starting certificate metadata upload to ipfs",
  metadataUploadSuccess: (cid: string) =>
    `Certificate uploaded successfully to ipfs, cid: ${cid}`,
  metadataUploadError:
    "Something went wrong while uploading the image file to ipfs",
  mintingStart: "Minting certificate",
  mintingError: "Something went wrong while minting the certificate",
};

export const placeholders = {
  name: "Human-readable name for the certificate",
  description: "Description for the certificate",
  external_link: "External link with more information",
  workScopesLabel: "Work scopes",
  workScopes: "Click to start searching for work scopes",
  workScopesDescription:
    "The different scopes that are encapsulated by this certificate",
  impactScopesLabel: "Impact scopes",
  impactScopes: "Click to start searching for impact scopes",
  impactScopesDescription:
    "The different scopes that are encapsulated by this certificate",
  workTimeStartLabel: "Work time start",
  workTimeEndLabel: "Work time end",
  impactTimeStartLabel: "Impact time start",
  impactTimeEndLabel: "Impact time end",
  workTimeStartDescription: "The moment at which work started",
  workTimeEndDescription: "The moment at which work ended",
  impactTimeStartDescription: "The moment at which impact started",
  impactTimeEndDescription: "The moment at which impact ended",
  uploadImage: "Drag and drop some files here, or click to select files",
};

export const buttons = {
  submit: "Claim hypercert",
};

export const addWorkScopeModal = {
  title: "Add new work scope",
  placeholder: "New workscope name",
  submit: "Confirm",
  close: "Close",
  toastError: "Something went wrong while adding the work scope ",
  toastSuccess: (transactionHash: string) =>
    `Work scope ${transactionHash} successfully added`,
};

export const addImpactScopeModal = {
  title: "Add new impact scope",
  placeholder: "New impact scope name",
  submit: "Confirm",
  close: "Close",
  toastError: "Something went wrong while adding the impact scope",
  toastSuccess: (transactionHash: string) =>
    `Impact scope ${transactionHash} successfully added`,
};
