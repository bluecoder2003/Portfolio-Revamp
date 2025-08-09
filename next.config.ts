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
      "react-icons/ri",
      "react-icons/fa",
      "react-icons/fa6",
    ],
    // Enable more aggressive optimizations
    // optimizeCss: true, // Temporarily disabled due to critters dependency issue
  },

  // Enable compression
  compress: true,

  // Configure webpack for better tree shaking
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Enable tree shaking for specific packages
      config.resolve.alias = {
        ...config.resolve.alias,
        "react-icons/ri": "react-icons/ri/index.esm.js",
        "react-icons/fa": "react-icons/fa/index.esm.js",
        "react-icons/fa6": "react-icons/fa6/index.esm.js",
      };

      // Optimize chunks
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          icons: {
            test: /[\\/]node_modules[\\/](react-icons|lucide-react)[\\/]/,
            name: "icons",
            chunks: "all",
            priority: 10,
          },
          animations: {
            test: /[\\/]node_modules[\\/](motion|@rive-app)[\\/]/,
            name: "animations",
            chunks: "async",
            priority: 15,
          },
        },
      };
    }

    return config;
  },

  // Optimize production builds
  ...(process.env.NODE_ENV === "production" && {
    compiler: {
      removeConsole: true, // Remove console.logs in production
    },
    poweredByHeader: false,
    // Enable static optimization
    trailingSlash: false,
  }),
};

export default withBundleAnalyzer(nextConfig);
