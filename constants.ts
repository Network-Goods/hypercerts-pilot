import { requireEnv } from "./utils/requireEnv";
import { headerLinkLabels } from "./content/layout";
import { Hypercert } from "./pages/browse";

export const FORMAT_VERSION = "0.1";

export const DEFAULT_CHAIN_ID = requireEnv(
  process.env.NEXT_PUBLIC_DEFAULT_CHAIN,
  "NEXT_PUBLIC_DEFAULT_CHAIN"
);

export const SHEET_BEST_ENDPOINT = requireEnv(
  process.env.NEXT_PUBLIC_SHEET_BEST_ENDPOINT,
  "NEXT_PUBLIC_SHEET_BEST_ENDPOINT"
);

export const urls = {
  browse: { label: headerLinkLabels.browse, href: "/browse" },
  claim: { label: headerLinkLabels.claim, href: "/claim-hypercert" },
  burn: { label: headerLinkLabels.burn, href: "/burn-hypercert" }
};

export const hypercerts: Hypercert[] = [
  {
    id: "a",
    name: "AI existential safety",
    contributors: ["name 1", "name 2"],
    image: "https://picsum.photos/200",
    fractions: [
      {
        ownerId: "a",
        owner: "Bill gates",
        percentage: 80
      },
      {
        ownerId: "b",
        owner: "Linda gates",
        percentage: 20
      }
    ]
  },
  {
    id: "b",
    name: "AI existential safety",
    contributors: ["name 1", "name 2"],
    image: "https://picsum.photos/200",
    fractions: [
      {
        ownerId: "a",
        owner: "Bill gates",
        percentage: 80
      },
      {
        ownerId: "b",
        owner: "Linda gates",
        percentage: 20
      }
    ]
  },
  {
    id: "c",
    name: "AI existential safety",
    contributors: ["name 1", "name 2"],
    image: "https://picsum.photos/200",
    fractions: [
      {
        ownerId: "a",
        owner: "Bill gates",
        percentage: 80
      },
      {
        ownerId: "b",
        owner: "Linda gates",
        percentage: 20
      }
    ]
  },
  {
    id: "d",
    name: "AI existential safety",
    contributors: ["name 1", "name 2"],
    image: "https://picsum.photos/200",
    fractions: [
      {
        ownerId: "a",
        owner: "Bill gates",
        percentage: 80
      },
      {
        ownerId: "b",
        owner: "Linda gates",
        percentage: 20
      }
    ]
  },
  {
    id: "e",
    name: "AI existential safety",
    contributors: ["name 1", "name 2"],
    image: "https://picsum.photos/200",
    fractions: [
      {
        ownerId: "a",
        owner: "Bill gates",
        percentage: 80
      },
      {
        ownerId: "b",
        owner: "Linda gates",
        percentage: 20
      }
    ]
  },
  {
    id: "f",
    name: "AI existential safety",
    contributors: ["name 1", "name 2"],
    image: "https://picsum.photos/200",
    fractions: [
      {
        ownerId: "a",
        owner: "Bill gates",
        percentage: 80
      },
      {
        ownerId: "b",
        owner: "Linda gates",
        percentage: 20
      }
    ]
  }
];