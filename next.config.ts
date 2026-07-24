import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: '/setup',
        destination: '/car',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
