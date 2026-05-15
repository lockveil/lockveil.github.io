self.addEventListener("push", event => {
  event.waitUntil(
    fetch("https://lockveil.github.io/feed.xml")
      .then(res => res.text())
      .then(text => {
        // Try to get push data
        let pushData = {};
        try { pushData = event.data ? event.data.json() : {}; } catch(e) {}

        // If custom type, use provided title/body
        if (pushData.type === "custom" && pushData.title) {
          return self.registration.showNotification(pushData.title, {
            body: pushData.body || "",
            icon: "/assets/img/Avatars/wrose.jpg",
            data: { url: "https://lockveil.github.io" },
          });
        }

        // Otherwise fetch latest post
        const titleMatch = text.match(/<entry>[\s\S]*?<title>(.*?)<\/title>/);
        const linkMatch = text.match(/<entry>[\s\S]*?<link href="(.*?)"/);
        const summaryMatch = text.match(/<entry>[\s\S]*?<summary>(.*?)<\/summary>/);

        const title = titleMatch ? titleMatch[1].trim() : "New post on lockveil";
        const url = linkMatch ? linkMatch[1].trim() : "https://lockveil.github.io";
        const body = summaryMatch ? summaryMatch[1].replace(/<[^>]+>/g, "").slice(0, 100).trim() : "A new post was just published.";

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
