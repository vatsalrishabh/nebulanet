// app/sitemap.xml/route.ts
import { indianCities } from "@/lib/indianCities";

export async function GET() {
  const baseUrl = 'https://nebulanet.in';

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/courses',
    '/signup',
    '/signin',
    '/blog',
    '/cancellation',
    '/shipping',
    '/terms'
  ];

  const staticUrls = staticPages.map(path => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('');

  const cityUrls = indianCities.map(city => {
    const slug = city.toLowerCase().replace(/\s+/g, '-');
    return `
    <url>
      <loc>${baseUrl}/web-developer/${slug}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${cityUrls}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
