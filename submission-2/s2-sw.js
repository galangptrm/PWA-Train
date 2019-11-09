const BASE_URL = "https://api.football-data.org/v2/";
const TOKEN = "78fdf28ebc864284b61dd70ee83b5242";

const CACHE_LAYOUT = "layout_cache";
const CACHE_COMPETITION = "api_cache";

let component_layout_to_cache = [
    "./",
    "./index.html",
    "./nav.html",
    "./manifest.json",
    "./css/materialize.min.css",
    "./css/font.css",
    "./font/material-icon.woff2",
    "./js/materialize.min.js",
    "./js/nav.js",
    "./js/api_football.js",
    "./js/db.js",
    "./js/idb.js",
    "./ball-192.png",
    "./ball-500.png",
    "./pages/favorit.html",
    "./pages/liga.html",
    "./tim.html",
    "./main.js"
]

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_LAYOUT)
        .then((cache)=>{
            return cache.addAll(component_layout_to_cache);
        })
    )
});

self.addEventListener("fetch", (event)=>{
    // When request containing BASE_URL of (API, etc)
    if (event.request.url.indexOf(BASE_URL) > -1) {
        event.respondWith(
            caches.open(CACHE_COMPETITION)
            .then((cache)=>{
                return fetch(event.request)
                    .then((response)=>{
                        cache.put(event.request.url, response.clone());
                        console.log("List dari Server");
                        return response;
                    });
            })
        );
    }
    // When request only need to fetch layout
    else {
        event.respondWith(
            caches.match(event.request)
            .then((response)=> {
                console.log("List dari Cache : ");
                return response || fetch(event.request);
            })
            .catch((e)=>{
                console.log("Tidak ada cache yang cocok");
                console.error(e);
            })
        )
    }
});

// Push Listener
self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: '/ball-144.png',
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