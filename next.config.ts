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
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@rive-app/react-canvas',
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  serverExternalPackages: ['@lottiefiles/dotlottie-react'],
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  httpAgentOptions: {
    keepAlive: true,
  },
};

export default nextConfig;
