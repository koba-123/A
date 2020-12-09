
var cacheName = 'zaiqri';
var filesToCache = [
  '/',
  'index.html',
  '/css/style.css',
  '/js/main.js'
];

/* サービスワーカー起動して、コンテンツをキャッシュする */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
    );
  });
  
  /* オフライン時はキャッシュからコンテンツを取得する */
  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
      );
    });
｝

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.routing.registerRoute(
    '/',
    new workbox.strategies.NetworkFirst()
)

workbox.routing.registerRoute(
    new RegExp(/(.*\.js|.*\css\app.css|.*\.jpg|.*\.png|.*\.ico)/),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'assets',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 20
            }),
        ],
    })
)
