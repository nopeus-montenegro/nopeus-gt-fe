import { prisma } from '@/05_shared/lib/prisma/db';
import type { MetadataRoute } from 'next';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nopeus-gt.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/car`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/track`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    const [cars, tracks, setups] = await Promise.all([
      prisma.car.findMany({
        select: { id: true, updatedAt: true },
      }),
      prisma.track.findMany({
        select: { id: true, updatedAt: true },
      }),
      prisma.setup.findMany({
        select: { id: true, updatedAt: true },
      }),
    ]);

    const carRoutes: MetadataRoute.Sitemap = cars.map(car => ({
      url: `${baseUrl}/car/${car.id}`,
      lastModified: car.updatedAt ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const trackRoutes: MetadataRoute.Sitemap = tracks.map(track => ({
      url: `${baseUrl}/track/${track.id}`,
      lastModified: track.updatedAt ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const setupRoutes: MetadataRoute.Sitemap = setups.map(setup => ({
      url: `${baseUrl}/setup/${setup.id}`,
      lastModified: setup.updatedAt ?? new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }));

    return [...staticRoutes, ...carRoutes, ...trackRoutes, ...setupRoutes];
  } catch (error) {
    console.error('[Sitemap generation error]:', error);

    return staticRoutes;
  }
}
