import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const robotsContent = `
User-agent: *
Disallow:

# Example Sitemap - if you add one later
# Sitemap: https://yourdomain.com/sitemap.xml
  `;

  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
};