// Chirpy PWA cache logic
const CACHE_NAME = "chirpy-cache-v1";
const urlsToCache = ["/", "/assets/css/jekyll-theme-chirpy.css"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Push notification logic
self.addEventListener("push", event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || "New post", {
      body: data.body || "",
      icon: "/assets/img/Avatars/wrose.jpg",
    })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
