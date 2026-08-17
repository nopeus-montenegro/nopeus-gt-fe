import { prisma } from '@/05_shared/lib/prisma/db';
import { slugify } from '@/05_shared/utils/slugify';
import type { MetadataRoute } from 'next';
import { getFullNewsFeed } from './actions/news-feed';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nopeus-gt.app/';

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
      changeFrequency: 'weekly',
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
    const [cars, tracks, setups, news] = await Promise.all([
      prisma.car.findMany({
        select: { name: true, manufacturer: true, year: true, id: true, updatedAt: true },
      }),
      prisma.track.findMany({
        select: { name: true, configName: true, id: true, updatedAt: true },
      }),
      prisma.setup.findMany({
        select: { car: true, id: true, updatedAt: true },
      }),
      getFullNewsFeed(),
    ]);

    const newsRoutes: MetadataRoute.Sitemap = news.map(post => ({
      url: `${baseUrl}/news/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const carRoutes: MetadataRoute.Sitemap = cars.map(car => ({
      url: `${baseUrl}/car/${slugify([car.manufacturer, car.name, car.year.toString(), car.id])}`,
      lastModified: car.updatedAt ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const trackRoutes: MetadataRoute.Sitemap = tracks.map(track => ({
      url: `${baseUrl}/track/${slugify([track.name, track.configName, track.id])}`,
      lastModified: track.updatedAt ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    const setupRoutes: MetadataRoute.Sitemap = setups.map(setup => ({
      url: `${baseUrl}/setup/${slugify([setup.car.manufacturer, setup.car.name, setup.car.year.toString(), 'setup', setup.id])}`,
      lastModified: setup.updatedAt ?? new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    }));

    return [...staticRoutes, ...carRoutes, ...trackRoutes, ...setupRoutes, ...newsRoutes];
  } catch (error) {
    console.error('[Sitemap generation error]:', error);

    return staticRoutes;
  }
}
