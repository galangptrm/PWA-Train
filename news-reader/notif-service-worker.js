const CACHE_NAME = "push-notification-v1";
var urlsToCache = [
  "./",
  "./nav.html",
  "./index.html",
  "./article.html",
  "./pages/home.html",
  "./pages/about.html",
  "./pages/contact.html",
  "./css/materialize.min.css",
  "./js/materialize.min.js",
  "./js/nav.js",
  "./js/api.js",
  "./logo-icon.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
        })
    );
});  

self.addEventListener('notificationclick', function (event) {
    if (!event.action) {
      // Penguna menyentuh area notifikasi diluar action
      console.log('Notification Click.');
      return;
    }
    switch (event.action) {
      case 'yes-action':
        console.log('Pengguna memilih action yes.');
        // buka tab baru
        clients.openWindow('https://google.com');
        break;
      case 'no-action':
        console.log('Pengguna memilih action no');
        break;
      default:
        console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
        break;
    }
});

self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    let options = {
      body: body,
      icon: './logo-icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});