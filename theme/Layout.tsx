// Rspress v2: named import from theme-original (no default export)
import { Layout as DefaultLayout } from '@rspress/core/theme-original';
import { useEffect } from 'react';
// rslint-disable-next-line import/no-unresolved
import './styles.scss';

/**
 * Register Carbon Web Components in the browser.
 * Dynamic imports keep them out of the SSR bundle.
 */
async function loadCarbonComponents(): Promise<void> {
  await Promise.all([
    // Tags / badges used for rule severity
    import('@carbon/web-components/es/components/tag/index.js'),
    // Inline notifications used for tips and warnings
    import('@carbon/web-components/es/components/notification/index.js'),
    // Structured list for the rules overview table
    import('@carbon/web-components/es/components/structured-list/index.js')
  ]);
}

export function Layout() {
  useEffect(() => {
    // Apply Carbon g100 (dark) theme to the document root
    document.documentElement.dataset.carbonTheme = 'g100';
    loadCarbonComponents().catch((error: unknown) => {
      console.error(error);
    });
  }, []);

  return <DefaultLayout />;
}
