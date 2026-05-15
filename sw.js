const CACHE_NAME = "chirpy-cache-v1";
const urlsToCache = ["/", "/assets/css/jekyll-theme-chirpy.css"];

self.addEventListener("push", event => {
  event.waitUntil(
    fetch("https://lockveil.github.io/feed.xml")
      .then(res => res.text())
      .then(text => {
        // Log first 500 chars to see what we get
        console.log("FEED:", text.slice(0, 500));
        
        const titleMatch = text.match(/<entry>[\s\S]*?<title>(.*?)<\/title>/);
        const linkMatch = text.match(/<entry>[\s\S]*?<link href="(.*?)"/);
        const summaryMatch = text.match(/<entry>[\s\S]*?<summary>(.*?)<\/summary>/);

        console.log("TITLE:", titleMatch);
        console.log("LINK:", linkMatch);
        console.log("SUMMARY:", summaryMatch);

        const title = titleMatch ? titleMatch[1].trim() : "New post on lockveil";
        const url = linkMatch ? linkMatch[1].trim() : "https://lockveil.github.io";
        const body = summaryMatch ? summaryMatch[1].replace(/<[^>]+>/g, "").slice(0, 100).trim() : "A new post was just published.";

        return self.registration.showNotification(title, {
          body,
          icon: "/assets/img/Avatars/wrose.jpg",
          data: { url },
        });
      })
      .catch(err => {
        console.error("PUSH ERROR:", err);
        return self.registration.showNotification("New post on lockveil", {
          body: "A new post was just published.",
          icon: "/assets/img/Avatars/wrose.jpg",
          data: { url: "https://lockveil.github.io" },
        });
      })
  );
});
