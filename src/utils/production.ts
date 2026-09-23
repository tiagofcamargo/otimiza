import { publicRoutes } from '../data/routes.ts';
type PublicEnv = Record<string, string | boolean | undefined>;
export function createPublicConfig(env: PublicEnv, development: boolean) {
  let siteUrl: string | undefined;
  if (typeof env.PUBLIC_SITE_URL === 'string' && env.PUBLIC_SITE_URL.trim()) {
    try {
      const url = new URL(env.PUBLIC_SITE_URL.trim());
      const local = url.hostname === 'localhost' || url.hostname.endsWith('.localhost') || url.hostname.endsWith('.local') || /^[\d.]+$/.test(url.hostname) || url.hostname.includes(':');
      if (url.protocol === 'https:' && !url.username && !url.password && !url.port && !local && url.pathname === '/' && !url.search && !url.hash && url.hostname.includes('.')) siteUrl = url.origin;
    } catch { /* Missing or invalid configuration produces no invented public URL. */ }
  }
  const gaId = !development && siteUrl && typeof env.PUBLIC_GA_ID === 'string' && /^G-[A-Z0-9]{6,20}$/.test(env.PUBLIC_GA_ID.trim()) ? env.PUBLIC_GA_ID.trim() : undefined;
  return { siteUrl, indexingEnabled: !development && Boolean(siteUrl) && env.PUBLIC_INDEXING_ENABLED === 'true', gaId };
}
type Publication = Pick<ReturnType<typeof createPublicConfig>, 'siteUrl' | 'indexingEnabled'>;
export function renderRobots(config: Publication) {
  return config.indexingEnabled && config.siteUrl ? `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n';
}
export function renderSitemap(config: Publication) {
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const urls = config.siteUrl ? publicRoutes.map(route => `  <url><loc>${escape(new URL(route, config.siteUrl).href)}</loc></url>`).join('\n') : '';
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
