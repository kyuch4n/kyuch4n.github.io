const VER = '1.0.0';
const CACHE_NAME = 'KYU_SW_V' + VER;

const URL_TO_CACHE = [
  '/assets/home.jpg',
  '/css/framework.css',
  '/css/syntax.css',
  '/css/bootstrap.css',
  '/js/framework.js',
  '/js/jquery.js',
  '/js/bootstrap.js',
];
self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URL_TO_CACHE);
    }),
  );
});

self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList
          .filter(function(key) {
            return key !== CACHE_NAME;
          })
          .map(function(key) {
            console.log('[ServiceWorker] Removing old cache: ', key);
            return caches.delete(key);
          }),
      );
    }),
  );

  return self.clients.claim();
});

const DOMAIN_TO_IGNORE = ['baidu.com'];
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(res => {
      return (
        res ||
        fetch(event.request)
          .then(responese => {
            const url = event.request.url;
            if (!DOMAIN_TO_IGNORE.find(i => url.indexOf(i) > -1)) {
              console.log('[ServiceWorker] Add to cache: ', url);
              const responeseClone = responese.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responeseClone);
              });
            }
            return responese;
          })
          .catch(err => {
            console.log(err);
          })
      );
    }),
  );
});
