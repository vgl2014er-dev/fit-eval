self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Check if the request is for a video
  if (event.request.url.includes('.mp4')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Return cached response if found, otherwise fetch from network
        return response || fetch(event.request);
      })
    );
  } else {
    // Default pass-through for other requests
    event.respondWith(fetch(event.request));
  }
});
