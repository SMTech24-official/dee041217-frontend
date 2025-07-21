import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      {
        protocol: "http",
        hostname: "10.0.10.79",
        port: "5004",
      },
      {
        protocol: "http",
        hostname: "10.0.10.79",
        port: "5004",  
      },
    ],
  },
};

export default nextConfig;
