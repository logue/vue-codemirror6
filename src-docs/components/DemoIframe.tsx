import { useDark, withBase } from '@rspress/core/runtime';
import { useEffect, useRef, useState } from 'react';

/** Message sent from the demo (iframe) so the page can fit the iframe height. */
export interface ResizeIframeMessage {
  type: 'resize-iframe';
  height: string;
}

/** Message sent to the demo (iframe) to switch its Carbon theme. */
export interface SetThemeMessage {
  type: 'set-theme';
  dark: boolean;
}

const isResizeMessage = (data: unknown): data is ResizeIframeMessage =>
  typeof data === 'object' &&
  data !== null &&
  (data as Partial<ResizeIframeMessage>).type === 'resize-iframe';

export function DemoIframe({ src, title }: { src: string; title: string }) {
  const [height, setHeight] = useState('300px');
  const iframeElement = useRef<HTMLIFrameElement>(null);
  const dark = useDark();
  // `base` in rstack.config.ts is derived from the package.json name, so
  // `/demo/index.html` becomes `/vue-codemirror6/demo/index.html`.
  const iframeSource = withBase(src.startsWith('/') ? src : `/${src}`);

  /** Send the current site theme to the demo. */
  const postTheme = (): void => {
    const message: SetThemeMessage = { type: 'set-theme', dark };
    iframeElement.current?.contentWindow?.postMessage(message, globalThis.location.origin);
  };

  // Keep the demo theme in sync with the docs site theme (the initial theme is sent on load).
  useEffect(postTheme, [dark]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<unknown>) => {
      if (event.origin !== globalThis.location.origin || !isResizeMessage(event.data)) {
        return;
      }
      setHeight(`${event.data.height}px`);
    };
    globalThis.addEventListener('message', handleMessage);

    return () => {
      globalThis.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <iframe
      ref={iframeElement}
      title={title}
      src={iframeSource}
      onLoad={postTheme}
      style={{
        width: '100%',
        height: height,
        border: 'none',
        overflow: 'hidden',
        transition: 'height 0.2s ease'
      }}
    />
  );
}
