import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://frontlog.ru';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/*/dashboard', '/*/settings', '/*/auth'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
