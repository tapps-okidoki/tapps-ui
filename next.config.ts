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
      {
        protocol: 'https',
        hostname: 't.me',
        port: '',
        pathname: '/userpic/**',
      },
    ],
  },
};

export default nextConfig;
