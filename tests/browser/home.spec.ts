import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

const viewports = [
  [360, 800], [375, 812], [390, 844], [430, 932], [768, 1024],
  [1024, 900], [1280, 900], [1440, 900], [1920, 1080],
] as const;

for (const [width, height] of viewports) {
  test(`Home fits and loads its assets at ${width}×${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    // Trigger lazy assets and ensure every rendered asset resolves.
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
    expect(await page.evaluate(() => document.fonts.check('600 48px "Manrope"'))).toBe(true);
    await page.evaluate(() => scrollTo(0, 0));
    await expect(page.locator('#mobile-contact-bar')).toBeHidden();
    await mkdir('docs/qa/polimento-final/screenshots', { recursive: true });
    await page.screenshot({ path: `docs/qa/polimento-final/screenshots/home-${width}x${height}.png`, fullPage: true });
    await page.screenshot({ path: `docs/qa/polimento-final/screenshots/hero-${width}x${height}.png` });
    if ([360, 375, 390, 430, 768, 1024, 1440].includes(width)) {
      for (const [name, selector] of Object.entries({ valores: '.advisory-values', decisoes: '.decisions-section', servicos: '#servicos', metodo: '#como-trabalhamos', tributario: '#planejamento', transicao: '.transition-section', faq: '#perguntas-frequentes', encerramento: '#converse', footer: 'footer' })) {
        const section = (await page.locator(selector).boundingBox())!;
        await page.screenshot({ path: `docs/qa/polimento-final/screenshots/${name}-${width}.png`, fullPage: true, clip: { x: 0, y: Math.floor(section.y), width, height: Math.ceil(section.height) } });
      }
    }
    expect(errors).toEqual([]);
  });
}

test('mobile menu supports keyboard, Escape, anchors and focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('.header-cta')).toBeHidden();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  const toggle = page.locator('#mobile-menu > summary');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation', { name: 'Navegação mobile' })).toBeVisible();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(page.locator('#mobile-menu')).not.toHaveAttribute('open');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Navegação mobile' }).getByRole('link', { name: 'Serviços', exact: true }).click();
  await expect(page.locator('#mobile-menu')).not.toHaveAttribute('open');
  await expect(page).toHaveURL(/\/servicos$/);
  await expect(page.locator('h1')).toContainText('Cada decisão empresarial');
});

test('mobile contact bar follows hero, menu and final contact visibility', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const bar = page.locator('#mobile-contact-bar');
  await expect(bar).toBeHidden();
  await page.locator('#servicos').scrollIntoViewIfNeeded();
  await expect(bar).toBeVisible();
  await page.locator('#mobile-menu').evaluate((element) => { (element as HTMLDetailsElement).open = true; });
  await expect(bar).toBeHidden();
  await page.locator('#mobile-menu').evaluate((element) => { (element as HTMLDetailsElement).open = false; });
  await expect(bar).toBeVisible();
  await page.locator('#converse').scrollIntoViewIfNeeded();
  await expect(bar).toBeHidden();
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(bar).toBeHidden();
  await page.evaluate(() => scrollTo(0, 0));
  await expect(bar).toBeHidden();
});

test('contact bar appears after jumping past a hero CTA initially below a short viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 400 });
  await page.goto('/');
  await expect(page.locator('#hero-contact')).not.toBeInViewport();
  await page.locator('#servicos').scrollIntoViewIfNeeded();
  await expect(page.locator('#mobile-contact-bar')).toBeVisible();
});

test('hero art does not overlap tablet actions and confirmed contact target is present', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const button = (await page.locator('#hero-contact').boundingBox())!;
  const art = (await page.locator('.hero-art').boundingBox())!;
  await expect(page.locator('#hero-contact')).toHaveAttribute('href', /^https:\/\/wa\.me\/5511971774720\?text=/);
  expect(button.x + button.width <= art.x || button.y + button.height <= art.y || button.y >= art.y + art.height).toBe(true);
  await expect(page.locator('.contact-note')).toHaveCount(0);
});

test('conceptual image caption remains readable outside the overlapping context card', async ({ page }) => {
  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const caption = (await page.locator('.hero-art figcaption').boundingBox())!;
    const card = (await page.locator('.context-card').boundingBox())!;
    expect(caption.y >= card.y + card.height || caption.x >= card.x + card.width || caption.x + caption.width <= card.x).toBe(true);
  }
});

test('content reflows when text is enlarged to 200 percent in a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('#mobile-menu summary').click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('tablet tax layout keeps individual criterion words intact', async ({ page }) => {
  for (const width of [768, 1024]) {
    await page.setViewportSize({ width, height: 1024 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (const [selector, word] of [['.tax-principle p > span', 'perspectivas.'], ['.criteria-grid > div:last-child dt', 'Consequências']]) {
      const lineCount = await page.locator(selector).evaluate((element, word) => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          const start = node.textContent?.indexOf(word) ?? -1;
          if (start < 0) continue;
          const range = document.createRange();
          range.setStart(node, start); range.setEnd(node, start + word.length);
          return new Set([...range.getClientRects()].map(rect => Math.round(rect.top))).size;
        }
        throw new Error(`Missing criterion word: ${word}`);
      }, word);
      expect(lineCount).toBe(1);
    }
  }
});

test('all local links resolve and the confirmed WhatsApp channel is available', async ({ page, request }) => {
  await page.goto('/');
  const links = await page.locator('a').evaluateAll((elements) => elements.map((element) => (element as HTMLAnchorElement).href));
  for (const href of new Set(links)) {
    const url = new URL(href);
    if (url.origin === 'http://127.0.0.1:4321') {
      expect((await request.get(url.pathname)).ok()).toBe(true);
      if (url.hash) await expect(page.locator(url.hash)).toHaveCount(1);
    }
  }
  await expect(page.locator('a[href^="https://wa.me/5511971774720?text="]')).not.toHaveCount(0);
  await expect(page.locator('#hero-contact')).toHaveAttribute('href', /^https:\/\/wa\.me\/5511971774720\?text=/);
  await expect(page.getByRole('link', { name: /@otimiza_assessoria/ })).toHaveAttribute('href', 'https://www.instagram.com/otimiza_assessoria/');
  const response = await request.get('/pagina-inexistente/');
  expect(response.status()).toBe(404);
});

test('FAQ can be operated with keyboard', async ({ page }) => {
  await page.goto('/');
  const first = page.locator('.faq-list details').first();
  await first.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(first).toHaveAttribute('open');
  await expect(first.locator('p')).toBeVisible();
  await page.keyboard.press('Space');
  await expect(first).not.toHaveAttribute('open');
});

test('navigation, contact and FAQ remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321');
  await page.locator('#mobile-menu summary').click();
  await expect(page.getByRole('navigation', { name: 'Navegação mobile' })).toBeVisible();
  await page.locator('#mobile-menu summary').click();
  const first = page.locator('.faq-list details').first();
  await first.locator('summary').click();
  await expect(first.locator('p')).toBeVisible();
  await expect(page.locator('#hero-contact')).toHaveAttribute('href', /^https:\/\/wa\.me\/5511971774720\?text=/);
  await expect(page.locator('#mobile-contact-bar')).toBeHidden();
  await context.close();
});

for (const width of [390, 1440]) {
  test(`WCAG automated checks at ${width}px, including expanded navigation and FAQ`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    if (width < 1200) await page.locator('#mobile-menu summary').click();
    await page.locator('.faq-list details').first().evaluate((element) => { (element as HTMLDetailsElement).open = true; });
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('metadata does not fabricate a domain or business facts', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page).toHaveTitle(/Otimiza/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Contabilidade empresarial/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://otimizacontabil.com.br/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  const organization = graph['@graph'][0];
  expect(organization.sameAs).toEqual(['https://www.instagram.com/otimiza_assessoria/']);
  for (const key of ['address', 'telephone', 'taxID', 'aggregateRating', 'founder']) expect(organization[key]).toBeUndefined();
});
