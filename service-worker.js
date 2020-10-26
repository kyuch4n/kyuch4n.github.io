var VER = 'v1';
var CACHE_NAME = 'kyu-sw' + VER;
var urlsToCache = [];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(res => {
      return (
        res ||
        fetch(event.request)
          .then(responese => {
            const responeseClone = responese.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responeseClone);
            });
            return responese;
          })
          .catch(err => {
            console.log(err);
          })
      );
    }),
  );
});
