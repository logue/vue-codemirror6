// Rspress v2: re-export from theme-original, then override Layout with ours
// The original theme's Layout is intentionally replaced with the custom one below.
// rslint-disable import/export
export * from '@rspress/core/theme-original';
export { Layout } from './Layout';
