import { requireEnv } from "./utils/requireEnv";
import { headerLinkLabels } from "./content/layout";

export const FORMAT_VERSION = "0.2";

export const DEFAULT_CHAIN_ID = requireEnv(
  process.env.NEXT_PUBLIC_DEFAULT_CHAIN,
  "NEXT_PUBLIC_DEFAULT_CHAIN"
);

export const SHEET_BEST_ENDPOINT = requireEnv(
  process.env.NEXT_PUBLIC_SHEET_BEST_ENDPOINT,
  "NEXT_PUBLIC_SHEET_BEST_ENDPOINT"
);

export const CONTRACT_ADDRESS = requireEnv(
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  "NEXT_PUBLIC_CONTRACT_ADDRESS"
);

export const GRAPH_ENDPOINT = requireEnv(
  process.env.NEXT_PUBLIC_GRAPH_ENDPOINT,
  "NEXT_PUBLIC_GRAPH_ENDPOINT"
);

export const urls = {
  browse: {
    label: headerLinkLabels.browse,
    href: "/",
    showOnlyWhenConnected: false,
  },
  claim: {
    label: headerLinkLabels.claim,
    href: "/claim-hypercert",
    showOnlyWhenConnected: false,
  },
  allowlist: {
    label: headerLinkLabels.allowlist,
    href: "/claim-allowlist-hypercert",
    showOnlyWhenConnected: false,
  },
  // myHypercerts: {
  //   label: headerLinkLabels.myHypercerts,
  //   href: "/my-hypercerts",
  //   showOnlyWhenConnected: false,
  // },
};
