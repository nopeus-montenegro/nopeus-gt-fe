import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: '/setup',
        destination: '/car',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_BLOB_URL}/**`)],
  },
};

export default nextConfig;
