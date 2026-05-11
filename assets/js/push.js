const WORKER_URL = "https://notif.lockveil.workers.dev";
const VAPID_PUBLIC_KEY = "BJsK7dARHWo7p817pklqkh6pB0qtdGvpL2BAbI_NYciz1L0OTUkQGGnn-8ZGLMT8iFWV_xDW9xHp-M8U-ZSnb5g";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

async function subscribe() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    alert("Push notifications not supported in this browser.");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const reg = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  await fetch(`${WORKER_URL}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sub),
  });

  alert("Subscribed to notifications!");
}

async function unsubscribe() {
  const reg = await navigator.serviceWorker.getRegistration("/sw.js");
  if (!reg) return;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return;
  await fetch(`${WORKER_URL}/unsubscribe`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint: sub.endpoint }),
  });
  await sub.unsubscribe();
  alert("Unsubscribed.");
}
