const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
    '../Parent - webapp/app.js',
    '../Parent - webapp/dashboard.html',
    '..Parent - webapp/history_hidden.css',
    '../Parent - webapp/history.css',
    '../Parent - webapp/history.html',
    '../Parent - webapp/history.js',
    '../Parent - webapp/Index.html',
    '../Parent - webapp/login_hidden.css',
    '../Parent - webapp/login.css',
    '../Parent - webapp/login.js',
    '../Parent - webapp/styles_hidden.css',
    '../Parent - webapp/styles.css',
    '../Parent - webapp/manifest.json'
    

    // Include any other assets you want to cache
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching files');
            return cache.addAll(CACHE_ASSETS);
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
