/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {},
  env: {
    NFT_STORAGE_TOKEN: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
  },
  transpilePackages: ["@network-goods/hypercert-sdk"],
};

module.exports = nextConfig;
