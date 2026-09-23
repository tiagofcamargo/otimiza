import { execFileSync } from 'node:child_process';
import { readFile,writeFile,rm,copyFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { createStaticServer } from '../serve.mjs';
import { publicRoutes } from '../../src/data/routes.ts';
const out='.qa-production-analytics';
execFileSync(process.execPath,['--experimental-strip-types','scripts/qa/audit-institutional-config.mjs'],{stdio:'inherit'});
await copyFile('docs/qa/auditoria-institucional/configuracao-validada.json','docs/qa/pre-producao/configuracao-validada.json');
const result={};
const production=await createStaticServer('dist');await new Promise(r=>production.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${production.address().port}`;
try{
 for(const route of publicRoutes){const response=await fetch(origin+route);if(response.status!==200)throw new Error(route);}
 for(const route of ['/nao-existe','/conteudos','/.env','/package.json']){if((await fetch(origin+route)).status!==404)throw new Error(`404 ${route}`);}
 result.staticServer={routes:12,missingStatus:404,headers:Object.fromEntries((await fetch(origin+'/')).headers)};
}finally{await new Promise(r=>production.close(r));}
let server,browser;
try{
 execFileSync('corepack',['pnpm','exec','astro','build','--outDir',out],{env:{...process.env,PUBLIC_SITE_URL:'https://example.test',PUBLIC_INDEXING_ENABLED:'false',PUBLIC_WHATSAPP:'',PUBLIC_GA_ID:'G-ABC1234567'},stdio:'pipe'});
 server=await createStaticServer(out);await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const origin=`http://127.0.0.1:${server.address().port}`;browser=await chromium.launch({headless:true});const page=await browser.newPage();let requests=0;const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.route('**/*',async route=>{const url=new URL(route.request().url());if(url.origin===origin)return route.continue();if(url.hostname==='www.googletagmanager.com'){requests++;return route.fulfill({contentType:'text/javascript',body:'/* intercepted: no data sent */'});}return route.abort();});
 await page.goto(origin);await page.evaluate(()=>document.fonts.ready);
 if(requests!==0||await page.locator('script[src*="googletagmanager"]').count()!==0)throw new Error('Tag loaded before consent');
 await page.evaluate(()=>window.dispatchEvent(new CustomEvent('otimiza:analytics-consent',{detail:{granted:false}})));
 if(requests!==0)throw new Error('Tag loaded on refusal');
 const loadedResponse=page.waitForResponse(response=>response.url().includes('googletagmanager'));
 await page.evaluate(()=>window.dispatchEvent(new CustomEvent('otimiza:analytics-consent',{detail:{granted:true}})));
 await page.waitForFunction(()=>document.querySelector('script[src*="googletagmanager"]'));
 await loadedResponse;
 await page.evaluate(()=>window.dispatchEvent(new CustomEvent('otimiza:analytics-consent',{detail:{granted:true}})));
 const loaded=await page.locator('script[src*="googletagmanager"]').count();
 await page.evaluate(()=>window.dispatchEvent(new CustomEvent('otimiza:analytics-consent',{detail:{granted:false}})));
 const disabled=await page.evaluate(()=>window['ga-disable-G-ABC1234567']);
 if(loaded!==1||requests!==1||!disabled||errors.length)throw new Error(JSON.stringify({loaded,requests,disabled,errors}));
 result.analytics={noRequestBeforeConsent:true,noRequestOnRefusal:true,oneTagAfterConsent:true,disabledAfterRevocation:true,externalRequestsIntercepted:requests,realDataSent:false};
 if((await readFile('dist/index.html','utf8')).includes('data-ga-id'))throw new Error('Review build contaminated');
 await writeFile('docs/qa/pre-producao/runtime-validado.json',JSON.stringify(result,null,2)+'\n');
 console.log('Servidor real: 12 rotas/404 aprovados. Analytics: consentimento e revogação aprovados, tag interceptada; nenhum dado enviado.');
}finally{if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));await rm(out,{recursive:true,force:true});}
