const CACHE_NAME = "codepolitan-reader-lite-v2";
var urlsToCache = [
    "/", 
    "/index.html", 
    "/js/main.js", 
    "/img/codepolitan_logo.png"];
 
self.addEventListener("install", function(event) {
  console.log("ServiceWorker: Menginstall..");
 
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log("ServiceWorker: Membuka cache..");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event dieksekusi setiap kali browser coba terkoneksi ke internet
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request, {cacheName:CACHE_NAME})
      .then(function(response) {
        if (response) {
          return response;
        }
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200) {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Aktivasi service worker baru');
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME && cacheName.startsWith("codepolitan-reader-lite")) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});