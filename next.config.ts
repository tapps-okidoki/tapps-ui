import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ton.app',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
