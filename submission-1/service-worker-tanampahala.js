const CACHE_NAME = "tanampahala-cache-2";
var urlsToCache = [
  "./",
  "./manifest.json",
  "./nav.html",
  "./index.html",
  "./footer.html",
  "./pages/home.html",
  "./pages/program.html",
  "./pages/donasi.html",
  "./pages/profil.html",
  "./css/materialize.min.css",
  "./css/style.css",
  "./js/materialize.min.js",
  "./js/nav.js",
  "./js/footer.js",
  "./favicon.png",
  "./favicon-192.png",
  "./img/baju.jpg",
  "./img/botol.jpg",
  "./img/buku-crop.jpg",
  "./img/buku.jpg",
  "./img/kardus.jpg",
  "./img/karung-bekas.jpg",
  "./img/kertas.jpg",
  "./img/koin.jpg",
  "./img/logo1.png",
  "./img/masgalang.jpg",
  "./img/minyak-crop.jpg"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache)
              .then(()=> console.log('Succesfully adding to cache'));
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});