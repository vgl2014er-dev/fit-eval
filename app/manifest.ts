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
        src: '/android/launchericon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/android/launchericon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/android/launchericon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/android/launchericon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/android/launchericon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android/launchericon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
