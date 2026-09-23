import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createPublicConfig, renderRobots, renderSitemap } from '../src/utils/production.ts';
import { publicRoutes } from '../src/data/routes.ts';

test('public config rejects malformed or non-public origins and normalizes a valid HTTPS origin',()=>{
 for(const value of [undefined,'','http://example.test','https://user:password@example.test','https://localhost','https://127.0.0.1','https://example.test/path','https://example.test?q=1','invalid'])assert.equal(createPublicConfig({PUBLIC_SITE_URL:value},false).siteUrl,undefined,String(value));
 assert.equal(createPublicConfig({PUBLIC_SITE_URL:' https://example.test/ '},false).siteUrl,'https://example.test');
});
test('indexing needs production, explicit release and a valid origin',()=>{
 const env={PUBLIC_SITE_URL:'https://example.test',PUBLIC_INDEXING_ENABLED:'true'};
 assert.equal(createPublicConfig(env,true).indexingEnabled,false);
 assert.equal(createPublicConfig(env,false).indexingEnabled,true);
 assert.equal(createPublicConfig({...env,PUBLIC_SITE_URL:''},false).indexingEnabled,false);
 for(const value of [undefined,'false','1','TRUE'])assert.equal(createPublicConfig({...env,PUBLIC_INDEXING_ENABLED:value},false).indexingEnabled,false);
});
test('robots and sitemap are coherent before and after explicit release',()=>{
 const blank=createPublicConfig({},false);assert.equal(renderRobots(blank),'User-agent: *\nDisallow: /\n');assert.ok(!renderSitemap(blank).includes('<loc>'));
 const pending=createPublicConfig({PUBLIC_SITE_URL:'https://example.test'},false);assert.ok(!renderRobots(pending).includes('Sitemap:'));const xml=renderSitemap(pending);assert.equal((xml.match(/<loc>/g)||[]).length,12);assert.equal(publicRoutes.length,12);assert.ok(!xml.includes('404'));assert.ok(!xml.includes('conteudos'));assert.ok(!xml.includes('robots.txt'));assert.ok(xml.includes('<loc>https://example.test/</loc>'));
 const live={...pending,indexingEnabled:true};assert.equal(renderRobots(live),'User-agent: *\nAllow: /\nSitemap: https://example.test/sitemap.xml\n');assert.equal(renderSitemap(live),xml);
});
test('analytics config is optional, validates GA4 IDs and stays off in development',()=>{
 for(const id of [undefined,'','UA-12345','G-123<script>'])assert.equal(createPublicConfig({PUBLIC_GA_ID:id,PUBLIC_SITE_URL:'https://example.test'},false).gaId,undefined);
 const env={PUBLIC_SITE_URL:'https://example.test',PUBLIC_GA_ID:'G-ABC1234567'};assert.equal(createPublicConfig(env,false).gaId,'G-ABC1234567');assert.equal(createPublicConfig(env,true).gaId,undefined);assert.equal(createPublicConfig({...env,PUBLIC_SITE_URL:''},false).gaId,undefined);
});
