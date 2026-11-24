import { onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Messages exchanged with the documentation site.
 * Keep in sync with `src-docs/components/DemoIframe.tsx`.
 */
type ResizeIframeMessage = { type: 'resize-iframe'; height: string };
type SetThemeMessage = { type: 'set-theme'; dark: boolean };

/** Whether the demo runs inside an iframe (embedded in the documentation site). */
export const isEmbedded = globalThis.self !== globalThis.top;

function isSetThemeMessage(data: unknown): data is SetThemeMessage {
  return (
    typeof data === 'object' &&
    data !== null && // eslint-disable-line unicorn/no-null -- `typeof null` is 'object'.
    (data as Partial<SetThemeMessage>).type === 'set-theme'
  );
}

/**
 * When embedded, follow the parent page's theme and report the content height
 * so the parent can size the iframe. Does nothing when opened standalone.
 *
 * @param dark Theme state to update from `set-theme` messages.
 */
export function useEmbed(dark: Ref<boolean>): void {
  if (!isEmbedded) return;

  const origin = globalThis.location.origin;
  let observer: ResizeObserver | undefined;

  function handleMessage(event: MessageEvent<unknown>): void {
    if (event.origin !== origin || !isSetThemeMessage(event.data)) return;
    dark.value = event.data.dark;
  }

  function postHeight(): void {
    const message: ResizeIframeMessage = {
      type: 'resize-iframe',
      height: String(document.documentElement.scrollHeight)
    };
    globalThis.parent.postMessage(message, origin);
  }

  onMounted(() => {
    globalThis.addEventListener('message', handleMessage);
    observer = new ResizeObserver(postHeight);
    observer.observe(document.body);
  });

  onUnmounted(() => {
    globalThis.removeEventListener('message', handleMessage);
    observer?.disconnect();
  });
}
