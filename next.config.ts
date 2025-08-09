import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neelakshi.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/portfolio/**',
      },
    ],
  },
};

export default nextConfig;
