import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Suppress no-img-element warnings since we're loading from CDN URLs where next/image optimization doesn't apply
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
