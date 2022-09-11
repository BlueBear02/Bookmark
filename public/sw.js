"use strict"
const CACHE_NAME = "my-cache";
const CACHED_URLS = [
    "/",
    "/index.html",
    "/assets/css/reset.css",
    "/assets/css/style.css",
    "/assets/js/localForage.js",
    "/assets/js/localforage.min.js",
    "/assets/js/navigation.js",
    "/assets/js/script.js",
    "/assets/images/plus-sign-button.svg"
];

self.addEventListener("install",function(e) {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(CACHED_URLS);
    }))
});

self.addEventListener("fetch", function(e) {
    e.respondWith(
        fetch(e.request)
            .catch(() => {
                return caches.open(CACHE_NAME).then(cache => {
                    return cache.match(e.request);
                })
            })
    )
});

self.addEventListener("activate", e=> {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (CACHE_NAME !== cacheName && cacheName.startsWith("my-cache")) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})
