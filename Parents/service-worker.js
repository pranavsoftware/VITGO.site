const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
    '../Parents/bookHistory.css',
    '../Parents/bookHistory.html',
    '../Parents/bookHistory.js',
    '../Parents/booking_hidden.css',
    '../Parents/booking.css',
    '../Parents/booking.html',
    '../Parents/booking.js',
    '../Parents/bookingHistory_hidden.css',
    '../Parents/dashboard.css',
    '../Parents/dashboard.html',
    '../Parents/dashboard.js',
    '../Parents/login_hidden.css',
    '../Parents/login.css',
    '../Parents/login.html',
    '../Parents/login.js',
    '../Parents/manifest.json',
    '../Parents/ward details.css',
    '../Parents/ward details_hidden.css',
    '../Parents/ward details.html',
    '../Parents/ward details.js',
    '../Parents/contact us.html',
    '../Parents/contact us.css',
    '../Parents/contact_hidden.css'

];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching files...');
            // Cache each asset and log any errors
            return Promise.all(CACHE_ASSETS.map(asset => {
                return cache.add(asset).then(() => {
                    console.log(`Successfully cached: ${asset}`);
                }).catch((error) => {
                    console.error(`Failed to cache ${asset}:`, error);
                });
            }));
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log(`Serving cached response for: ${event.request.url}`);
                return response; // Return cached response if found
            } else {
                console.log(`Fetching from network: ${event.request.url}`);
                return fetch(event.request); // Fetch from network if not cached
            }
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log(`Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName); // Delete old caches
                    }
                })
            );
        })
    );
});
