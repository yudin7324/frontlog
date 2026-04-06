import type { MetadataRoute } from 'next';
import { prisma } from '@/shared/lib/prisma';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://frontlog.ru';
const locales = ['ru', 'en'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await prisma.category.findMany({
    where: { isVisible: true },
    select: { slug: true },
  });

  const staticRoutes = ['', '/categories'].flatMap((path) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    }))
  );

  const categoryRoutes = categories.flatMap((cat) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/categories/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...categoryRoutes];
}
