import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SYS.FITNESS.EVAL',
    short_name: 'FIT.EVAL',
    description: 'Technical fitness test execution and ranking system',
    start_url: '/',
    id: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#E2FF31',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
