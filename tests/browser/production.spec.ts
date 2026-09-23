import { test,expect } from '@playwright/test';

test('production endpoints stay blocked while the confirmed domain and social asset are present',async({request,page})=>{
 const robots=await request.get('/robots.txt');expect(robots.status()).toBe(200);expect(await robots.text()).toBe('User-agent: *\nDisallow: /\n');const sitemap=await request.get('/sitemap.xml');expect(sitemap.status()).toBe(200);expect(sitemap.headers()['content-type']).toContain('xml');expect((await sitemap.text()).match(/<loc>/g)?.length).toBe(12);expect(await sitemap.text()).toContain('https://otimizacontabil.com.br/');
 const image=await request.get('/brand/og-otimiza.png');expect(image.status()).toBe(200);const bytes=await image.body();expect(bytes.readUInt32BE(16)).toBe(1200);expect(bytes.readUInt32BE(20)).toBe(630);expect(bytes.length).toBeLessThan(200_000);
 await page.goto('/');await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content','https://otimizacontabil.com.br/brand/og-otimiza.png');await expect(page.locator('[data-ga-id]')).toHaveCount(0);expect(await page.evaluate(()=>[...document.scripts].filter(s=>s.src.startsWith('http')&&!s.src.startsWith(location.origin)).length)).toBe(0);
});

test('all published pages preserve alternative text and protect links opening new tabs',async({page})=>{
 const routes=['/','/sobre','/servicos',...['contabilidade-empresarial','fiscal-e-tributario','planejamento-tributario','departamento-pessoal','abertura-de-empresa','troca-de-contador'].map(s=>`/servicos/${s}`),'/perguntas-frequentes','/contato','/politica-de-privacidade'];
 for(const route of routes){await page.goto(route);await expect(page.locator('img:not([alt])')).toHaveCount(0);for(const a of await page.locator('a[target="_blank"]').all()){await expect(a).toHaveAttribute('rel',/noopener/);await expect(a).toHaveAttribute('rel',/noreferrer/);}await expect(page.locator('[data-ga-id]')).toHaveCount(0);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');}
});
