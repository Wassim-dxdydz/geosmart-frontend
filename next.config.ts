import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  turbopack: {
    root: "C:\\Users\\abahr\\Downloads\\ML-WebApp\\frontend",
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "next-themes"],
  },
};

export default nextConfig;
