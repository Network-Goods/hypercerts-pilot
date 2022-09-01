import { requireEnv } from "./utils/requireEnv";

export const FORMAT_VERSION = "0.1";

export const DEFAULT_CHAIN_ID = requireEnv(
  process.env.NEXT_PUBLIC_DEFAULT_CHAIN,
  "NEXT_PUBLIC_DEFAULT_CHAIN"
);
