import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neelakshi.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/portfolio/**",
      },
    ],
  },
  // Optimize bundle splitting and tree shaking
  experimental: {
    optimizePackageImports: [
      "motion",
      "@rive-app/react-canvas",
      "lucide-react",
      "react-icons",
    ],
  },

  // Enable compression
  compress: true,
  // Optimize production builds
  ...(process.env.NODE_ENV === "production" && {
    compiler: {
      removeConsole: true, // Remove console.logs in production
    },
  }),
};

export default withBundleAnalyzer(nextConfig);
