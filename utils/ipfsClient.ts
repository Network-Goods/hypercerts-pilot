import { NFTStorage } from "nft.storage";
import { requireEnv } from "./requireEnv";
import { MetaData } from "../types/MetaData";

const NFT_STORAGE_TOKEN = requireEnv(
  process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY,
  "NEXT_PUBLIC_NFT_STORAGE_API_KEY"
);
export const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

async function getDefaultImageUrl() {
  const imageOriginUrl =
    "https://bafybeig72v6dvoq2jbd7g7cpe25uxdkpxlpvune6mrt3uiidwge7qvydiy.ipfs.dweb.link";
  const r = await fetch(imageOriginUrl);
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.status}]: ${r.statusText}`);
  }
  return r.blob();
}

export const uploadCertificateToIpfs = async ({
  name,
  external_url,
  description = "a",
  ...rest
}: MetaData) => {
  const imageOrExampleImage = await getDefaultImageUrl();
  const metadata = await client.store({
    name,
    description,
    image: imageOrExampleImage,
    properties: {
      ...rest,
      external_url,
    },
  });
  console.log("Uploaded to IPFS", metadata);
  return metadata;
};
