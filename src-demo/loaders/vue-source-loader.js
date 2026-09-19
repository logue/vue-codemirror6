import { readFileSync } from 'node:fs';

export default function vueSourceLoader() {
  const source = readFileSync(this.resourcePath, 'utf8');
  return `export default ${JSON.stringify(source)};`;
}
