import { NFTStorage } from "nft.storage";
import { requireEnv } from "./requireEnv";
import { MetaData } from "../types/MetaData";

const NFT_STORAGE_TOKEN = requireEnv(
  process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY,
  "NEXT_PUBLIC_NFT_STORAGE_API_KEY"
);
export const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

export const uploadImage = async (
  name: string,
  description: string,
  image: File
) => {
  const token = {
    name,
    description,
    image: image,
  };
  const metadata = await client.store(token);
  console.log("Uploaded file to ipfs", metadata);
  return metadata;
};

export const uploadJson = async (metaData: MetaData) => {
  const json = JSON.stringify(metaData);
  const blob = new Blob([json]);
  const result = await client.storeBlob(blob);
  console.log("Uploaded meta to ipfs", result);
  return result;
};
