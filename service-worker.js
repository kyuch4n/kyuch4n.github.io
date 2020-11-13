'use strict';

/**
 * !!!
 * @VER will be replaced to the latest timestamp when build
 */
var VER = 1605276843706;
var CACHE_NAME = 'KYU_SW_' + VER;
var URL_TO_CACHE = [
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

var DOMAIN_BLACK_LIST = ['baidu.com'];
var RESOURCE_WHITE_LIST = ['.jpg', '.png', '.js', '.css'];

var enable = function enable(url) {
  if (
    !DOMAIN_BLACK_LIST.find(function(i) {
      return ~url.indexOf(i);
    })
  ) {
    if (
      RESOURCE_WHITE_LIST.find(function(i) {
        return ~url.indexOf(i);
      })
    ) {
      return true;
    }
  }

  return false;
};

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
      return (
        res ||
        fetch(event.request)
          .then(function(responese) {
            var url = event.request.url;

            if (enable(url)) {
              console.log('[ServiceWorker] Add to cache: ', url);
              var responeseClone = responese.clone();
              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, responeseClone);
              });
            }

            return responese;
          })
          .catch(function(err) {
            console.log(err);
          })
      );
    }),
  );
});
