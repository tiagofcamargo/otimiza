import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir,writeFile } from 'node:fs/promises';
const fresh=['perguntas-frequentes','contato','politica-de-privacidade'];
const routes=['/','/sobre','/servicos',...['contabilidade-empresarial','fiscal-e-tributario','planejamento-tributario','departamento-pessoal','abertura-de-empresa','troca-de-contador'].map(s=>`/servicos/${s}`),...fresh.map(s=>`/${s}`)];
const dir='docs/qa/auditoria-institucional';

test('institutional routes exist and have unique page metadata',async({page})=>{
 const titles=new Set(),descs=new Set();
 for(const slug of fresh){expect((await page.goto(`/${slug}`))?.status()).toBe(200);await expect(page.locator('h1')).toHaveCount(1);titles.add(await page.title());descs.add(await page.locator('meta[name=description]').getAttribute('content'));await expect(page.locator('.breadcrumbs [aria-current=page]')).toHaveCount(1);}
 expect(titles.size).toBe(3);expect(descs.size).toBe(3);
});
for(const slug of fresh){
 for(const [width,height] of [[360,800],[390,844],[430,932],[768,1024],[1440,900]])test(`${slug} fits ${width}`,async({page})=>{
  await page.setViewportSize({width,height});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});await page.goto(`/${slug}`);await page.evaluate(()=>document.fonts.ready);await page.locator('footer').scrollIntoViewIfNeeded();await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));await page.evaluate(()=>scrollTo(0,0));expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await mkdir(`${dir}/screenshots`,{recursive:true});await page.screenshot({path:`${dir}/screenshots/${slug}-${width}x${height}.png`,fullPage:true});if([390,1440].includes(width))await page.screenshot({path:`${dir}/screenshots/${slug}-hero-${width}.png`});expect(errors).toEqual([]);
 });
 for(const width of [390,1440])test(`${slug} axe ${width}`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.goto(`/${slug}`);if(width===390)await page.locator('#mobile-menu summary').click();await page.locator('main details').evaluateAll(es=>es.forEach(e=>(e as HTMLDetailsElement).open=true));expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 });
}

test('global navigation, links, CTA inventory and SEO across twelve pages',async({page,request})=>{
 const inventory:any[]=[];const titles=new Set(),descriptions=new Set();const checked=new Map<string,string>();
 for(const route of routes){
  expect((await page.goto(route))?.status()).toBe(200);await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator('main')).toHaveCount(1);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `https://otimizacontabil.com.br${route}`);
  const title=await page.title(),description=await page.locator('meta[name=description]').getAttribute('content');titles.add(title);descriptions.add(description);await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content',title);
  for(const href of ['/sobre','/servicos','/perguntas-frequentes','/contato']){await expect(page.locator(`.desktop-nav a[href="${href}"]`)).toHaveCount(1);await expect(page.locator(`footer nav a[href="${href}"]`)).toHaveCount(1);}
  await expect(page.locator('footer a[href="/politica-de-privacidade"]')).toHaveCount(1);
  const links=await page.locator('a').evaluateAll(es=>es.map(e=>({text:e.textContent?.trim(),href:e.getAttribute('href'),absolute:(e as HTMLAnchorElement).href,position:e.closest('header')?'header':e.closest('footer')?'footer':e.closest('section')?.id||'mobile',cta:e.hasAttribute('data-whatsapp')||e.classList.contains('button')})));
  for(const link of links){expect(link.href).toBeTruthy();expect(link.href).not.toBe('#');const url=new URL(link.absolute);if(url.origin!=='http://127.0.0.1:4321')continue;if(!checked.has(url.pathname)){const res=await request.get(url.pathname);expect(res.status(),link.absolute).toBe(200);checked.set(url.pathname,await res.text());}if(url.hash)expect(checked.get(url.pathname),link.absolute).toMatch(new RegExp(`id=["']${url.hash.slice(1)}["']`));}
  await expect(page.locator('a[href^="https://wa.me/5511971774720?text="]')).not.toHaveCount(0);const ids=await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id));expect(new Set(ids).size).toBe(ids.length);
  const graph=JSON.parse(await page.locator('script[type="application/ld+json"]').innerText())['@graph'];const organization=graph[0];for(const field of ['telephone','address','aggregateRating','review','priceRange','founder','numberOfEmployees'])expect(organization[field]).toBeUndefined();
  const levels=await page.locator('main :is(h1,h2,h3,h4)').evaluateAll(es=>es.map(e=>Number(e.tagName[1])));expect(levels.every((v,i)=>!i||v<=levels[i-1]+1)).toBe(true);
  inventory.push({route,title,description,headings:await page.locator('main :is(h1,h2,h3)').allTextContents(),schemaTypes:graph.map((g:any)=>g['@type']),links,ctas:links.filter(l=>l.cta)});
 }
 expect(titles.size).toBe(12);expect(descriptions.size).toBe(12);await mkdir(dir,{recursive:true});await writeFile(`${dir}/inventario-global.json`,JSON.stringify(inventory,null,2));
});

test('FAQ categories and accordions work by keyboard and without JS',async({browser,page})=>{
 await page.goto('/perguntas-frequentes');const categories=page.locator('.faq-index a');await expect(categories).toHaveCount(6);expect(await page.locator('.faq-list details').count()).toBeGreaterThanOrEqual(24);
 await page.locator('.faq-list summary').first().focus();await page.keyboard.press('Enter');await expect(page.locator('.faq-list details').first()).toHaveAttribute('open');await page.keyboard.press('Space');await expect(page.locator('.faq-list details').first()).not.toHaveAttribute('open');
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const nojs=await context.newPage();await nojs.goto('http://127.0.0.1:4321/perguntas-frequentes');const anchors=await nojs.locator('.faq-index a').all();for(const a of anchors){await a.click();const id=await a.getAttribute('href');await expect(nojs.locator(`${id} h2`)).toBeInViewport();}await nojs.locator('.faq-list summary').last().click();await expect(nojs.locator('.faq-list details').last()).toHaveAttribute('open');await context.close();
});

test('contact and privacy reflect actual features and reflow',async({page})=>{
 for(const slug of fresh){await page.setViewportSize({width:360,height:800});await page.goto(`/${slug}`);await page.addStyleTag({content:'html{font-size:200%}'});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page.locator('form,input,textarea,iframe')).toHaveCount(0);}
 await page.goto('/contato');await expect(page.locator('main a[href="https://www.instagram.com/otimiza_assessoria/"]')).not.toHaveCount(0);await expect(page.locator('main a[href^="mailto:"]')).toHaveCount(0);await expect(page.locator('main')).toContainText('Atendimento digital');await expect(page.locator('main')).not.toContainText(/segunda a sexta|09:00|contato@/);
 await page.goto('/politica-de-privacidade');await expect(page.locator('main')).toContainText('Direitos');await expect(page.locator('main')).not.toContainText(/REVISÃO|TODO|aconselhamento jurídico/);expect(await page.evaluate(()=>document.cookie)).toBe('');expect(await page.evaluate(()=>localStorage.length+sessionStorage.length)).toBe(0);
});

test('six visitor journeys lead to services, FAQ and contact',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 for(const slug of ['planejamento-tributario','troca-de-contador']){await page.goto('/');await page.locator(`main a[href="/servicos/${slug}"]`).first().click();await expect(page).toHaveURL(new RegExp(slug+'$'));if(slug==='troca-de-contador'){await page.locator('.faq-list summary').first().click();await expect(page.locator('.faq-list details').first()).toHaveAttribute('open');}await expect(page.locator('#hero-contact')).toHaveAttribute('href', /^https:\/\/wa\.me\/5511971774720\?text=/);}
 await page.goto('/');await page.locator('.desktop-nav a[href="/servicos"]').click();await page.locator('#abertura-de-empresa a[href="/servicos/abertura-de-empresa"]').click();await expect(page.locator('#hero-contact')).toHaveAttribute('href', /^https:\/\/wa\.me\/5511971774720\?text=/);
 await page.goto('/sobre');await page.locator('.desktop-nav a[href="/servicos"]').click();await page.locator('#departamento-pessoal a[href="/servicos/departamento-pessoal"]').click();await expect(page).toHaveURL(/departamento-pessoal$/);
 await page.goto('/perguntas-frequentes');await page.locator('.faq-list details').filter({has:page.locator('a[href="/servicos/abertura-de-empresa"]')}).first().locator('summary').click();await page.locator('.faq-list a[href="/servicos/abertura-de-empresa"]').first().click();await expect(page).toHaveURL(/abertura-de-empresa$/);
 for(const route of routes){await page.goto(route);await page.locator('.desktop-nav a[href="/contato"]').click();await expect(page).toHaveURL(/\/contato$/);}
});

test('mobile navigation marks current pages and 404 offers useful destinations',async({page})=>{
 await page.setViewportSize({width:390,height:400});await page.goto('/contato');const summary=page.locator('#mobile-menu summary');await summary.focus();await page.keyboard.press('Enter');await expect(page.locator('#mobile-menu a[aria-current="page"]')).toHaveAttribute('href','/contato');await page.locator('#mobile-menu .button').scrollIntoViewIfNeeded();await expect(page.locator('#mobile-menu .button')).toBeInViewport();await page.keyboard.press('Escape');await expect(summary).toBeFocused();
 expect((await page.goto('/rota-inexistente'))?.status()).toBe(404);await expect(page.locator('h1')).toHaveText('Esta página não foi encontrada.');for(const href of ['/','/servicos','/contato'])await expect(page.locator(`main a[href="${href}"]`)).toHaveCount(1);
});

test('desktop header remains collision-free at its breakpoint',async({page})=>{
 for(const width of [1200,1280,1440]){await page.setViewportSize({width,height:900});await page.goto('/');await page.evaluate(()=>document.fonts.ready);const brand=(await page.locator('.brand-link').boundingBox())!,nav=(await page.locator('.desktop-nav').boundingBox())!,cta=(await page.locator('.header-cta').boundingBox())!;expect(brand.x+brand.width).toBeLessThanOrEqual(nav.x);expect(nav.x+nav.width).toBeLessThanOrEqual(cta.x);expect(cta.x+cta.width).toBeLessThanOrEqual(width);await expect(page.locator('.header-cta')).toHaveText(/Falar com um especialista/);}
});
