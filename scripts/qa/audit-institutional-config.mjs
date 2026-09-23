import { execFileSync } from 'node:child_process';
import { readFile,writeFile,rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { services } from '../../src/data/services.ts';
import { taxMessage } from '../../src/data/tax-planning.ts';
const out='.qa-institutional-config';
const confirmedWhatsapp='5511971774720';
const routes=['/','/sobre','/servicos',...services.map(s=>`/servicos/${s.slug}`),'/perguntas-frequentes','/contato','/politica-de-privacidade'];
const file=route=>route==='/'?'index.html':`${route.slice(1)}/index.html`;
const digest=text=>createHash('sha256').update(text).digest('hex');
const before=await Promise.all(routes.map(async route=>[route,digest(await readFile(`dist/${file(route)}`))]));
const assert=(condition,message)=>{if(!condition)throw new Error(message)};
const report={cases:[],configuredCTAs:[]};
try {
 for(const fixture of [
  {name:'domain_without_release',domain:'https://example.test',release:'false',indexable:false},
  {name:'domain_with_explicit_release',domain:'https://example.test',release:'true',indexable:true},
  {name:'release_without_domain',domain:'',release:'true',indexable:false},
 ]){
  execFileSync('corepack',['pnpm','exec','astro','build','--outDir',out],{env:{...process.env,PUBLIC_SITE_URL:fixture.domain,PUBLIC_WHATSAPP:confirmedWhatsapp,PUBLIC_INDEXING_ENABLED:fixture.release,PUBLIC_GA_ID:''},stdio:'pipe'});
  for(const route of routes){
   const html=await readFile(`${out}/${file(route)}`,'utf8');
   assert(html.includes(`name="robots" content="${fixture.indexable?'index, follow':'noindex, nofollow'}"`),`${fixture.name} robots ${route}`);
   const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
   const expected=fixture.domain?fixture.domain+route:undefined;
   assert(canonical===expected,`${fixture.name} canonical ${route}`);
   const social=html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
   assert(social===(fixture.domain?fixture.domain+'/brand/og-otimiza.png':undefined),`social image ${route}`);
   const graph=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
   const organization=graph.filter(n=>Array.isArray(n['@type'])&&n['@type'].includes('Organization'));
   assert(organization.length===1,`organization ${route}`);
   const entity=graph.find(n=>n['@type']==='Service');
   if(entity)assert(entity.provider['@id']===(fixture.domain||'')+'/#organization',`provider ${route}`);
   if(fixture.name==='domain_without_release'){
    const anchors=[...html.matchAll(/<a\b([^>]*href="https:\/\/wa.me\/[^>]+)>(.*?)<\/a>/gs)];
    assert(anchors.length>=3,`missing CTAs ${route}`);
    assert(!html.includes('data-whatsapp="pending"'),`pending CTA ${route}`);
    const service=services.find(s=>route===`/servicos/${s.slug}`);
    let contextual=0;
    for(const match of anchors){const destination=match[1].match(/href="([^"]+)"/)[1].replaceAll('&amp;','&');const url=new URL(destination);const message=url.searchParams.get('text');assert(url.pathname===`/${confirmedWhatsapp}`&&message,`CTA ${route}`);if(message===(service?.slug==='planejamento-tributario'?taxMessage:service?.message))contextual++;
     const preceding=html.slice(0,match.index);const position=preceding.lastIndexOf('<header')>preceding.lastIndexOf('</header')?'header':preceding.lastIndexOf('<footer')>preceding.lastIndexOf('</footer')?'footer':preceding.lastIndexOf('id="mobile-contact-bar"')>preceding.lastIndexOf('</footer')?'mobile':([...preceding.matchAll(/<section[^>]+id="([^"]+)"/g)].at(-1)?.[1]||'main');
     report.configuredCTAs.push({route,position,label:match[2].replace(/<svg[\s\S]*?<\/svg>/g,'').replace(/<[^>]+>/g,'').trim(),message,destination});}
    if(service)assert(contextual===3,`three contextual CTAs ${route}: ${contextual}`);
   }
  }
  const sitemap=await readFile(`${out}/sitemap.xml`,'utf8');
  const locations=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  assert(JSON.stringify(locations)===JSON.stringify(fixture.domain?routes.map(route=>fixture.domain+route):[]),`sitemap ${fixture.name}`);
  const robots=await readFile(`${out}/robots.txt`,'utf8');assert(robots.includes(fixture.indexable?'Allow: /':'Disallow: /'),`robots file ${fixture.name}`);
  assert((await readFile(`${out}/404.html`,'utf8')).includes('content="noindex, nofollow"'),'404 noindex');
  report.cases.push({...fixture,routesChecked:routes.length,passed:true});
 }
 for(const [route,hash] of before)assert(digest(await readFile(`dist/${file(route)}`))===hash,`review dist changed ${route}`);
 report.reviewBuildUnchanged=true;
 await writeFile('docs/qa/auditoria-institucional/configuracao-validada.json',JSON.stringify(report,null,2)+'\n');
 console.log(`${report.cases.length} cenários × ${routes.length} páginas aprovados; ${report.configuredCTAs.length} CTAs inventariados. Dist preservado.`);
} finally { await rm(out,{recursive:true,force:true}); }
