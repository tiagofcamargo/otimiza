import { createServer } from 'node:http';
import { readFile,realpath,stat } from 'node:fs/promises';
import { resolve,sep,extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.svg':'image/svg+xml','.ico':'image/x-icon','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
/** Serve only the generated static directory. No SPA fallback or runtime rendering. */
export async function createStaticServer(directory) {
  const root=await realpath(directory);
  const contained=path=>path.startsWith(root+sep);
  const notFoundPath=await realpath(resolve(root,'404.html'));
  if(!contained(notFoundPath)||!(await stat(notFoundPath)).isFile())throw new Error('404.html deve ser um arquivo dentro de dist');
  const notFound=await readFile(notFoundPath);
  return createServer(async(req,res)=>{
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('X-Frame-Options','DENY');
    res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
    const send=(status,body,type='text/plain; charset=utf-8')=>{
      res.writeHead(status,{'Content-Type':type,'Content-Length':Buffer.byteLength(body),'Cache-Control':status===200&&type!=='text/html; charset=utf-8'?'public, max-age=3600':'no-cache'});
      res.end(req.method==='HEAD'?undefined:body);
    };
    if(!['GET','HEAD'].includes(req.method)){res.setHeader('Allow','GET, HEAD');send(405,'Method not allowed');return;}
    let pathname;
    try{pathname=decodeURIComponent((req.url||'/').split('?')[0]);}catch{send(400,'Bad request');return;}
    if(!pathname.startsWith('/')||pathname.includes('\\')||pathname.includes('\0')||pathname.split('/').includes('..')){send(400,'Bad request');return;}
    if(pathname.split('/').some(part=>part.startsWith('.'))){send(404,notFound,types['.html']);return;}
    try{
      let target=resolve(root,'.'+pathname);
      if(target!==root&&!contained(target)){send(400,'Bad request');return;}
      if((await stat(target)).isDirectory())target=resolve(target,'index.html');
      target=await realpath(target);
      const type=types[extname(target).toLowerCase()];
      if(!contained(target)||!type||!(await stat(target)).isFile()){send(404,notFound,types['.html']);return;}
      send(pathname==='/404.html'?404:200,await readFile(target),type);
    }catch(error){
      if(['ENOENT','ENOTDIR','EACCES','ELOOP'].includes(error.code)){send(404,notFound,types['.html']);return;}
      // Do not send filesystem paths or exception details to visitors.
      send(500,'Internal server error');
    }
  });
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const port=Number(process.env.PORT||3000);
  if(!Number.isInteger(port)||port<1||port>65535)throw new Error('PORT inválida');
  const server=await createStaticServer(fileURLToPath(new URL('../dist/',import.meta.url)));
  server.listen(port,'0.0.0.0',()=>console.log(`Otimiza: arquivos estáticos de dist na porta ${port}`));
  for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>server.close(()=>process.exit(0)));
}
