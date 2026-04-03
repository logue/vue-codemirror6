import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const src = resolve('dist/src/index.d.ts');
const dest = resolve('dist/index.d.ts');

if (!existsSync(src)) {
  console.error(`[sync-dts-entry] Source declaration not found: ${src}`);
  process.exit(1);
}

const content = readFileSync(src, 'utf8').replaceAll(
  "from '../Meta'",
  "from './src/Meta'"
);

writeFileSync(dest, content, 'utf8');
console.log(`[sync-dts-entry] Synced declaration entry: ${src} -> ${dest}`);
