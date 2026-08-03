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
    remotePatterns: [new URL('https://19z3gdb0u05zouco.public.blob.vercel-storage.com/**')],
  },
};

export default nextConfig;
