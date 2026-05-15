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

self.addEventListener("push", event => {
  event.waitUntil(
    fetch("https://lockveil.github.io/feed.xml")
      .then(res => res.text())
      .then(text => {
        const titleMatch = text.match(/<item[^>]*>[\s\S]*?<title><!\[CDATA\[(.*?)\]\]><\/title>/);
        const linkMatch = text.match(/<item[^>]*>[\s\S]*?<link>(.*?)<\/link>/);
        const descMatch = text.match(/<item[^>]*>[\s\S]*?<description><!\[CDATA\[(.*?)\]\]><\/description>/);

        const title = titleMatch ? titleMatch[1].trim() : "New post on lockveil";
        const url = linkMatch ? linkMatch[1].trim() : "https://lockveil.github.io";
        const body = descMatch ? descMatch[1].replace(/<[^>]+>/g, "").slice(0, 100).trim() : "A new post was just published.";

        return self.registration.showNotification(title, {
          body,
          icon: "/assets/img/Avatars/wrose.jpg",
          data: { url },
        });
      })
      .catch(() => {
        return self.registration.showNotification("New post on lockveil", {
          body: "A new post was just published.",
          icon: "/assets/img/Avatars/wrose.jpg",
          data: { url: "https://lockveil.github.io" },
        });
      })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || "https://lockveil.github.io"));
});
