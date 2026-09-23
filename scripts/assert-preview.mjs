import { readFile } from 'node:fs/promises';
const robots = await readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8');
if (/^Allow:\s*\//m.test(robots)) {
  throw new Error('Preview bloqueado: este build permite indexação. Refaça pnpm build com PUBLIC_INDEXING_ENABLED=false antes do preview.');
}
