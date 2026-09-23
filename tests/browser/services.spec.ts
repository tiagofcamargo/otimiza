import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

const pages = [
  { slug: 'contabilidade-empresarial', name: 'Contabilidade empresarial', related: ['fiscal-e-tributario', 'planejamento-tributario'], faq: 6 },
  { slug: 'fiscal-e-tributario', name: 'Fiscal e tributário', related: ['planejamento-tributario', 'contabilidade-empresarial'], faq: 6 },
  { slug: 'departamento-pessoal', name: 'Departamento pessoal', related: ['contabilidade-empresarial', 'abertura-de-empresa'], faq: 6 },
  { slug: 'abertura-de-empresa', name: 'Abertura de empresa', related: ['planejamento-tributario', 'contabilidade-empresarial', 'departamento-pessoal'], faq: 7 },
  { slug: 'troca-de-contador', name: 'Troca de contador', related: ['contabilidade-empresarial', 'fiscal-e-tributario'], faq: 7 },
];
const sizes = [[360,800],[390,844],[430,932],[768,1024],[1440,900]] as const;
const dir = 'docs/qa/servicos-completos/screenshots';

test('five service routes render unique metadata, correct schema and breadcrumbs', async ({ page }) => {
  const titles = new Set<string>(); const descriptions = new Set<string>();
  for (const service of pages) {
    expect((await page.goto(`/servicos/${service.slug}`))?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    titles.add(await page.title()); descriptions.add((await page.locator('meta[name="description"]').getAttribute('content'))!);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', await page.title());
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', (await page.locator('meta[name="description"]').getAttribute('content'))!);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://otimizacontabil.com.br/servicos/${service.slug}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('.breadcrumbs [aria-current="page"]')).toHaveText(service.name);
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    const entity = schema['@graph'].find((node: { '@type': string }) => node['@type'] === 'Service');
    expect(entity.name).toBe(service.name); expect(entity.url).toBe('https://otimizacontabil.com.br/servicos/' + service.slug);
    const crumbs = schema['@graph'].find((node: { '@type': string }) => node['@type'] === 'BreadcrumbList').itemListElement;
    expect(crumbs.map((item: { name: string }) => item.name)).toEqual(['Início', 'Serviços', service.name]);
    await expect(page.locator('main')).not.toContainText(/REVISÃO TÉCNICA OTIMIZA|TODO|Lorem ipsum/);
    const levels = await page.locator('main :is(h1,h2,h3,h4)').evaluateAll(els => els.map(el => Number(el.tagName.slice(1))));
    expect(levels.every((level, index) => index === 0 || level <= levels[index - 1] + 1)).toBe(true);
  }
  expect(titles.size).toBe(5); expect(descriptions.size).toBe(5);
});

for (const service of pages) {
  for (const [width,height] of sizes) {
    test(`${service.slug} fits ${width}×${height}`, async ({ page }) => {
      await page.setViewportSize({ width,height });
      const errors: string[] = [];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
      await page.goto(`/servicos/${service.slug}`); await page.evaluate(()=>document.fonts.ready);
      await page.locator('footer').scrollIntoViewIfNeeded(); await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await page.evaluate(()=>scrollTo(0,0)); await expect(page.locator('#mobile-contact-bar')).toBeHidden();
      await mkdir(dir,{recursive:true}); await page.screenshot({path:`${dir}/${service.slug}-${width}x${height}.png`,fullPage:true});
      if([390,1440].includes(width)) {
        await page.screenshot({path:`${dir}/${service.slug}-hero-${width}.png`});
        for (const section of await page.locator('main > section[id]').all()) {
          const id=await section.getAttribute('id');const box=(await section.boundingBox())!;
          await page.screenshot({path:`${dir}/${service.slug}-${id}-${width}.png`,fullPage:true,clip:{x:0,y:Math.floor(box.y),width,height:Math.ceil(box.height)}});
        }
      }
      expect(errors).toEqual([]);
    });
  }
  for(const width of [390,1440]) {
    test(`${service.slug} axe at ${width}`,async({page})=>{
      await page.setViewportSize({width,height:900});await page.goto(`/servicos/${service.slug}`);
      if(width===390)await page.locator('#mobile-menu summary').click();
      await page.locator('.faq-list details').evaluateAll(els=>els.forEach(el=>(el as HTMLDetailsElement).open=true));
      expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
    });
  }
  test(`${service.slug} contextual links, FAQ and contact work`,async({page,request})=>{
    await page.setViewportSize({width:390,height:844});await page.goto(`/servicos/${service.slug}`);
    for(const slug of service.related)await expect(page.locator(`main section:not(.related-services) a[href="/servicos/${slug}"]`)).not.toHaveCount(0);
    expect(await page.locator('.related-services a').count()).toBeGreaterThanOrEqual(2);
    expect(await page.locator('.related-services a').count()).toBeLessThanOrEqual(3);
    const links=await page.locator('a').evaluateAll(els=>[...new Set(els.map(el=>(el as HTMLAnchorElement).href))]);
    for(const href of links){const url=new URL(href);if(url.origin!=='http://127.0.0.1:4321')continue;const response=await request.get(url.pathname);expect(response.ok(),href).toBe(true);if(url.hash)expect(await response.text()).toMatch(new RegExp(`id=["']${url.hash.slice(1)}["']`));}
    await expect(page.locator('.faq-list details')).toHaveCount(service.faq);
    const faq=page.locator('.faq-list details').first();await faq.locator('summary').focus();await page.keyboard.press('Enter');await expect(faq).toHaveAttribute('open');await page.keyboard.press('Space');await expect(faq).not.toHaveAttribute('open');
    await expect(page.locator('#hero-contact')).toHaveAttribute('href', /^https:\/\/wa\.me\/5511971774720\?text=/);
    await page.locator('main > section').nth(2).scrollIntoViewIfNeeded();await expect(page.locator('#mobile-contact-bar')).toBeVisible();
    await page.locator('#converse').scrollIntoViewIfNeeded();await expect(page.locator('#mobile-contact-bar')).toBeHidden();
  });
}

test('service hub preserves its one highlighted service and links all six detail pages',async({page})=>{
  await page.goto('/servicos');await expect(page.locator('.internal-service-card--featured')).toHaveCount(1);
  await expect(page.locator('.internal-service-card--featured')).toHaveAttribute('id','planejamento-tributario');
  for(const service of pages)await expect(page.locator(`#${service.slug} a[href="/servicos/${service.slug}"]`)).toHaveCount(1);
});

test('new services reflow with 200% text and FAQ remains usable without JavaScript',async({page,browser})=>{
  for(const service of pages){await page.setViewportSize({width:360,height:844});await page.goto(`/servicos/${service.slug}`);await page.addStyleTag({content:'html {font-size:200%}'});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const nojs=await context.newPage();
  for(const service of pages){await nojs.goto(`http://127.0.0.1:4321/servicos/${service.slug}`);const faq=nojs.locator('.faq-list details').first();await faq.locator('summary').click();await expect(faq.locator('p')).toBeVisible();}
  await context.close();
});
