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

// Push notification logic - fetch latest post for title/body
self.addEventListener("push", event => {
  event.waitUntil(
    fetch("/feed.xml")
      .then(res => res.text())
      .then(text => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const latest = xml.querySelector("item");
        const title = latest?.querySelector("title")?.textContent || "New post on lockveil";
        const body = latest?.querySelector("description")?.textContent?.replace(/<[^>]+>/g, "").slice(0, 100) || "A new post was just published.";
        const link = latest?.querySelector("link")?.textContent || "/";
        return self.registration.showNotification(title, {
          body,
          icon: "/assets/img/Avatars/wrose.jpg",
          data: { url: link },
        });
      })
      .catch(() => {
        return self.registration.showNotification("New post on lockveil", {
          body: "A new post was just published.",
          icon: "/assets/img/Avatars/wrose.jpg",
          data: { url: "/" },
        });
      })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || "/"));
});
