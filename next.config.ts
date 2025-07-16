import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "github.com", protocol: "https" }],
  },
  reactStrictMode: false
  /* config options here */
};

export default nextConfig;
