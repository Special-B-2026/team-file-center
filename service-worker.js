/* Loan Document Center - Auto Update */

// เปิดใช้งาน Service Worker ใหม่
self.addEventListener("install", event => {
    event.waitUntil(self.skipWaiting());
});

// ลบแคชเก่าของเว็บไซต์
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
        .then(keys => Promise.all(
            keys
            .filter(key => key.startsWith("loan-center-"))
            .map(key => caches.delete(key))
        ))
        .then(() => self.clients.claim())
    );
});

// เรียกข้อมูลล่าสุดจากอินเทอร์เน็ต
self.addEventListener("fetch", event => {

    const url = new URL(event.request.url);

    if (
        event.request.method !== "GET" ||
        url.origin !== self.location.origin ||
        !url.href.startsWith(self.registration.scope)
    ) {
        return;
    }

    event.respondWith(
        fetch(event.request, {
            cache: "no-store"
        })
    );

});