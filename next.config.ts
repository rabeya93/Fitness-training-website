import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /** @type {import('next').NextConfig} */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.magnific.com" },
    ],
  },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
