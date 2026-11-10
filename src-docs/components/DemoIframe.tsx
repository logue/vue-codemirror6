import { withBase } from '@rspress/core/runtime';
import { useEffect, useState } from 'react';

export interface ParentToIframeMessage {
  type: string;
  height: string;
}

export function DemoIframe({ src, title }: { src: string; title: string }) {
  const [height, setHeight] = useState('300px');
  // `base` in rstack.config.ts is derived from the package.json name, so
  // `/demo/index.html` becomes `/annealer/demo/index.html`.
  const iframeSource = withBase(src.startsWith('/') ? src : `/${src}`);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<ParentToIframeMessage>) => {
      if (event.data.type === 'resize-iframe') {
        setHeight(`${event.data.height}px`);
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <iframe
      title={title}
      src={iframeSource}
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
