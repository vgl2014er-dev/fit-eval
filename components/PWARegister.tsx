'use client';

import { useEffect } from 'react';

export default function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = () => {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.error('Service Worker registration failed: ', err);
        });
      };

      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW);
      }
    }
  }, []);

  return null;
}
