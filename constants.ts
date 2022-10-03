import { requireEnv } from "./utils/requireEnv";
import { headerLinkLabels } from "./content/layout";

export const FORMAT_VERSION = "0.1";

export const DEFAULT_CHAIN_ID = requireEnv(
  process.env.NEXT_PUBLIC_DEFAULT_CHAIN,
  "NEXT_PUBLIC_DEFAULT_CHAIN"
);

export const urls = {
  browse: { label: headerLinkLabels.browse, href: "/browse" },
  claim: { label: headerLinkLabels.claim, href: "/claim-hypercert" },
  burn: { label: headerLinkLabels.burn, href: "/burn-hypercert" },
};
