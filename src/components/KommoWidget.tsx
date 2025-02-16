import { useEffect } from 'react';

interface KommoWidgetProps {
  color?: string;
  position?: 'fixed' | 'absolute' | 'relative';
  side?: 'right' | 'left';
  bottom?: number;
  right?: number;
  left?: number;
}

declare global {
  interface Window {
    crmPlugin: any;
  }
}

export function KommoWidget({
  color = '#D4AF37',
  position = 'fixed',
  side = 'right',
  bottom = 20,
  right = 20,
  left,
}: KommoWidgetProps) {
  useEffect(() => {
    // Wait for the window load event to ensure the crmPlugin is available
    const handleLoad = () => {
      if (window.crmPlugin) {
        window.crmPlugin('create', {
          color,
          position,
          side,
          bottom: `${bottom}px`,
          ...(side === 'right' ? { right: `${right}px` } : { left: `${left}px` }),
        });
      }
    };

    // If window is already loaded, initialize immediately
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [color, position, side, bottom, right, left]);

  return null;
}