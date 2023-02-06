**DEPRECATED** - Please refer to [https://github.com/Network-Goods/hypercerts](https://github.com/Network-Goods/hypercerts) for the latest docs

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure

- All human readable strings live in `/content`

## Metamask config

[Be sure to set the correct chainId in metamask for localhost:8584 development](https://stackoverflow.com/questions/73164955/hardhat-metamask-error-trying-to-send-a-raw-transaction-with-an-invalid-chain)

## Tooling

#### Graphql code generation
Running `codegen:watch` will automatically update the graphql types from queries wrappen in the `graphql()` function.
