import { defineConfig } from 'taze';

export default defineConfig({
  mode: 'major',
  include: ['/rspack/', '/rsbuild/', '/rspress/', '/rsdoctor/', '/rslib/', '/rstack/'],
  write: true,
  recursive: true
});
