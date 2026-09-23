import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

const routes = ['/sobre', '/servicos', '/servicos/planejamento-tributario'];
const sizes = [[360, 800], [390, 844], [430, 932], [768, 1024], [1440, 900]] as const;
const screenshotDir = 'docs/qa/paginas-internas/screenshots';

test('routes render distinct pages and metadata with honest structured data', async ({ page }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const route of routes) {
    expect((await page.goto(route))?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    titles.add(await page.title());
    descriptions.add((await page.locator('meta[name="description"]').getAttribute('content'))!);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', await page.title());
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://otimizacontabil.com.br${route}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('nav[aria-label="Você está aqui"] [aria-current="page"]')).toHaveCount(1);
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
    const crumb = schema['@graph'].find((item: { '@type': string }) => item['@type'] === 'BreadcrumbList');
    expect(crumb.itemListElement.at(-1).name).toBe(route.includes('planejamento') ? 'Planejamento tributário' : route === '/sobre' ? 'Sobre' : 'Serviços');
    expect(JSON.stringify(schema)).not.toMatch(/"Person"|"aggregateRating"|"telephone"|"taxID"|"address"/);
    await expect(page.locator('main')).not.toContainText(/TODO|revisão técnica da Otimiza|Lorem ipsum/);
  }
  expect(titles.size).toBe(3); expect(descriptions.size).toBe(3);
  await page.goto('/sobre'); await expect(page.locator('[data-team]')).toHaveCount(0);
});

for (const route of routes) {
  const name = route.split('/').at(-1);
  for (const [width, height] of sizes) {
    test(`${route} fits ${width}×${height}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
      await page.goto(route); await page.evaluate(() => document.fonts.ready);
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.evaluate(() => scrollTo(0, 0));
      await mkdir(screenshotDir, { recursive: true });
      await page.screenshot({ path: `${screenshotDir}/${name}-${width}x${height}.png`, fullPage: true });
      if ([390, 1440].includes(width)) {
        await page.screenshot({ path: `${screenshotDir}/${name}-hero-${width}.png` });
        for (const section of await page.locator('main > section[id]').all()) {
          const id = await section.getAttribute('id');
          const box = (await section.boundingBox())!;
          await page.screenshot({ path: `${screenshotDir}/${name}-${id}-${width}.png`, fullPage: true, clip: { x: 0, y: Math.floor(box.y), width, height: Math.ceil(box.height) } });
        }
      }
      expect(errors).toEqual([]);
    });
  }
  for (const width of [390, 1440]) {
    test(`${route} axe at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 }); await page.goto(route);
      if (width === 390) await page.locator('#mobile-menu summary').click();
      await page.locator('.faq-list details').evaluateAll(els => els.forEach(el => (el as HTMLDetailsElement).open = true));
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
    });
  }
}

test('navigation, contextual links and breadcrumbs resolve without unpublished service routes', async ({ page, request }) => {
  for (const route of ['/', ...routes]) {
    await page.goto(route);
    const hrefs = await page.locator('a').evaluateAll(links => [...new Set(links.map(a => (a as HTMLAnchorElement).href))]);
    for (const href of hrefs) {
      const url = new URL(href);
      if (url.origin !== 'http://127.0.0.1:4321') continue;
      const response = await request.get(url.pathname);
      expect(response.ok(), href).toBe(true);
      if (url.hash) expect(await response.text(), href).toMatch(new RegExp(`id=["']${url.hash.slice(1)}["']`));
    }
  }
  await page.goto('/');
  await expect(page.locator('main a[href="/servicos"]')).not.toHaveCount(0);
  await expect(page.locator('main a[href="/servicos/planejamento-tributario"]')).not.toHaveCount(0);
  await page.goto('/servicos');
  await page.getByRole('link', { name: 'Quero analisar meu regime tributário', exact: false }).click();
  await expect(page).toHaveURL(/#planejamento-tributario$/);
  await page.locator('#planejamento-tributario a[href="/servicos/planejamento-tributario"]').click();
  await expect(page).toHaveURL(/\/servicos\/planejamento-tributario$/);
  await page.getByRole('navigation', { name: 'Você está aqui' }).getByRole('link', { name: 'Serviços' }).click();
  await expect(page).toHaveURL(/\/servicos$/);
});

test('internal content reflows at 200% and tax FAQ works by keyboard without JavaScript', async ({ page, browser }) => {
  for (const route of routes) {
    await page.setViewportSize({ width: 360, height: 844 }); await page.goto(route);
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const offline = await context.newPage(); await offline.goto('http://127.0.0.1:4321/servicos/planejamento-tributario');
  const faq = offline.locator('.faq-list details').first(); await faq.locator('summary').focus();
  await offline.keyboard.press('Enter'); await expect(faq).toHaveAttribute('open');
  await expect(faq.locator('p')).toBeVisible(); await offline.keyboard.press('Space'); await expect(faq).not.toHaveAttribute('open');
  await offline.locator('#mobile-menu summary').click();
  await expect(offline.getByRole('navigation', { name: 'Navegação mobile' })).toBeVisible();
  await context.close();
});

test('analysis step numbers remain on a single line at all target widths', async ({ page }) => {
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height }); await page.goto('/servicos/planejamento-tributario');
    await page.evaluate(() => document.fonts.ready);
    const numbersFit = await page.locator('.analysis-steps li > span').evaluateAll(elements => elements.every(element => element.getBoundingClientRect().height <= parseFloat(getComputedStyle(element).lineHeight) + 1));
    expect(numbersFit, `step numbers at ${width}px`).toBe(true);
  }
});

test('internal mobile contact bars follow hero and close at the final CTA', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await page.goto(route); const bar = page.locator('#mobile-contact-bar');
    await expect(bar).toBeHidden();
    await page.locator('main > section').nth(2).scrollIntoViewIfNeeded();
    await expect(bar).toBeVisible();
    await expect(bar.locator('a')).toHaveAttribute('href', /^https:\/\/wa\.me\/5511971774720\?text=/);
    await page.locator('main').focus();
    await page.locator('#converse').scrollIntoViewIfNeeded();
    await expect(bar).toBeHidden();
  }
});
