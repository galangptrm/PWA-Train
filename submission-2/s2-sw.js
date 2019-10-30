const BASE_URL = "https://api.football-data.org/v2/";
const TOKEN = "78fdf28ebc864284b61dd70ee83b5242";

const CACHE_LAYOUT = "layout_cache";
const CACHE_COMPETITION = "competition_cache";
const CACHE_TEAM = "team_cache";

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
    "./js/api_football.js"
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
    // Get data dari Server
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
    else {
        event.respondWith(
            caches.match(event.request)
            .then((response)=> {
                console.log("List dari Cache");
                return response || fetch(event.request);
            })
        )
    }
});