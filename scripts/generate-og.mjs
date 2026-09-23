import { chromium } from '@playwright/test';
import { readFile,writeFile } from 'node:fs/promises';
// Render a dedicated brand artboard, never a screenshot of a website page.
const logo=(await readFile(new URL('../public/brand/logo-horizontal-branca-960.png',import.meta.url))).toString('base64');
const font=(await readFile(new URL('../public/fonts/manrope-400-700.woff2',import.meta.url))).toString('base64');
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage();
 const png=await page.evaluate(async({logo,font})=>{
  const face=new FontFace('Manrope',`url(data:font/woff2;base64,${font})`,{weight:'400 700'});document.fonts.add(await face.load());
  const image=new Image();image.src=`data:image/png;base64,${logo}`;await image.decode();
  const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=630;const ctx=canvas.getContext('2d');
  ctx.fillStyle='#232326';ctx.fillRect(0,0,1200,630);
  ctx.drawImage(image,120,100,960,171);
  ctx.font='600 64px Manrope';ctx.fillStyle='#fafafa';ctx.fillText('Conhecimento',120,388);
  ctx.fillStyle='#f83d32';ctx.fillText('para decidir.',120,470);
  ctx.font='400 24px Manrope';ctx.fillStyle='#dedee0';ctx.fillText('Atendimento online',120,560);
  return canvas.toDataURL('image/png').split(',')[1];
 },{logo,font});
 await writeFile(new URL('../public/brand/og-otimiza.png',import.meta.url),Buffer.from(png,'base64'));
}finally{await browser.close();}
