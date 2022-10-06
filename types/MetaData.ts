export interface MetaData {
  name: string;
  description?: string;
  external_url: string;
  format_version: string;
  prev_hypercert: string;
  refs: string[];
  contributor_names: string[];
}

export interface MetaDataResponse {
  name: string;
  description: string;
  image: string;
  properties: {
    contributor_names: string[];
    external_url: string;
    format_version: string;
    prev_hypercert: string;
  };
}
