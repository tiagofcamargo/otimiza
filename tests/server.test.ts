import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp,writeFile,rm,symlink,mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { AddressInfo } from 'node:net';
import { createStaticServer } from '../scripts/serve.mjs';

test('production static server serves pages and real 404s with safe file boundaries',async()=>{
 const root=await mkdtemp(join(tmpdir(),'otimiza-static-'));
 await writeFile(join(root,'index.html'),'<h1>Início</h1>');await writeFile(join(root,'404.html'),'<h1>Esta página não foi encontrada.</h1>');await mkdir(join(root,'sobre'));await writeFile(join(root,'sobre/index.html'),'<h1>Sobre</h1>');await writeFile(join(root,'.env'),'NOT_PUBLIC');await writeFile(join(root,'bundle.js.map'),'NOT_PUBLIC');await symlink('/etc/passwd',join(root,'outside.txt'));
 const server=await createStaticServer(root);await new Promise<void>(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${(server.address() as AddressInfo).port}`;
 try {
  for(const route of ['/','/sobre','/sobre/'])assert.equal((await fetch(base+route)).status,200);
  const missing=await fetch(base+'/nao-existe');assert.equal(missing.status,404);assert.match(await missing.text(),/não foi encontrada/);assert.equal(missing.headers.get('x-content-type-options'),'nosniff');assert.equal(missing.headers.get('x-frame-options'),'DENY');
  const head=await fetch(base+'/sobre',{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
  assert.equal((await fetch(base+'/',{method:'POST'})).status,405);
  for(const route of ['/.env','/bundle.js.map','/outside.txt','/src/data/business.ts'])assert.equal((await fetch(base+route)).status,404,route);
  assert.equal((await fetch(base+'/%ZZ')).status,400);assert.equal((await fetch(base+'/%2e%2e%2fetc/passwd')).status,400);
 }finally{await new Promise<void>(r=>server.close(()=>r()));await rm(root,{recursive:true});}
});

test('production server refuses an external symlink used as its 404 document',async()=>{
 const root=await mkdtemp(join(tmpdir(),'otimiza-static-404-'));
 try{await symlink('/etc/passwd',join(root,'404.html'));await assert.rejects(()=>createStaticServer(root),/404/);}finally{await rm(root,{recursive:true});}
});
