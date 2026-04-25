/* global self, caches, fetch, URL */

const CACHE_NAME = "objectif-permis-v2";
const BASE = "/Objectif_permis/";
const APP_SHELL = [BASE, `${BASE}manifest.webmanifest`, `${BASE}icon-192.svg`, `${BASE}icon-512.svg`];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => undefined));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (event.request.method !== "GET" || requestUrl.origin !== self.location.origin || !requestUrl.pathname.startsWith(BASE)) return;

  if (event.request.mode === "navigate" || ["script", "style", "worker"].includes(event.request.destination)) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => undefined);
        return response;
      }).catch(() => caches.match(event.request).then((cached) => cached || caches.match(BASE))),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => undefined);
      return response;
    }).catch(() => caches.match(BASE))),
  );
});
