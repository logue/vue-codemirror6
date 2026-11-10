import { useDark, useEventListener, useResizeObserver, useToggle } from '@vueuse/core';
import { onMounted } from 'vue';

/** Message sent from the docs site (parent window) to switch the demo theme. */
export interface SetThemeMessage {
  type: 'set-theme';
  dark: boolean;
}

/** Message sent to the docs site (parent window) so it can fit the iframe height. */
export interface ResizeIframeMessage {
  type: 'resize-iframe';
  height: string;
}

const isSetThemeMessage = (data: unknown): data is SetThemeMessage =>
  typeof data === 'object' &&
  data !== null &&
  (data as Partial<SetThemeMessage>).type === 'set-theme' &&
  typeof (data as Partial<SetThemeMessage>).dark === 'boolean';

/**
 * Integrates the demo with its host page.
 *
 * - Applies the Carbon theme by toggling the `cds--white` / `cds--g100` zone class on `<html>`.
 * - Initial theme: `?theme=dark|light` query, otherwise the stored / OS preference.
 * - When embedded in an iframe (docs site Playground):
 *   - accepts `{ type: 'set-theme', dark }` messages from the same origin, and
 *   - reports the document height with `{ type: 'resize-iframe', height }`.
 */
export function useDemoHost() {
  const isEmbedded = globalThis.self !== globalThis.top;

  const isDark = useDark({
    attribute: 'class',
    valueDark: 'cds--g100',
    valueLight: 'cds--white',
    storageKey: 'vue-codemirror6-demo-theme'
  });
  const toggleDark = useToggle(isDark);

  const queryTheme = new URLSearchParams(globalThis.location.search).get('theme');
  if (queryTheme === 'dark' || queryTheme === 'light') {
    isDark.value = queryTheme === 'dark';
  }

  if (isEmbedded) {
    useEventListener(globalThis, 'message', (event: MessageEvent<unknown>) => {
      if (event.origin !== globalThis.location.origin || !isSetThemeMessage(event.data)) {
        return;
      }
      isDark.value = event.data.dark;
    });

    const postHeight = () => {
      const message: ResizeIframeMessage = {
        type: 'resize-iframe',
        height: String(document.documentElement.scrollHeight)
      };
      globalThis.parent.postMessage(message, globalThis.location.origin);
    };

    onMounted(postHeight);
    useResizeObserver(document.body, postHeight);
  }

  return { isDark, isEmbedded, toggleDark };
}
