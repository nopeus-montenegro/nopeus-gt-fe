import type { NextConfig } from 'next';
import fs from 'node:fs';
import path from 'node:path';

function getLegacyRedirects() {
  const filePath = path.join(__dirname, 'legacy-redirects.json');
  if (!fs.existsSync(filePath)) return [];

  const redirectsMap = JSON.parse(fs.readFileSync(filePath, 'utf8')) as [string, string];

  return Object.entries(redirectsMap).map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
  }));
}

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
      ...getLegacyRedirects(),
    ];
  },
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_BLOB_URL}/**`)],
  },
};

export default nextConfig;
