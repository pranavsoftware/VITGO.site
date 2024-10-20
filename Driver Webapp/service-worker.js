const CACHE_NAME = 'easycab-cache-v1';
const urlsToCache = [
    '/',
    '../Driver Webapp/index.html',
    '../Driver Webapp/Driver_hidden.css',
    '../Driver Webapp/Driver.js',
    '../assets/logo (1).png',
    '../Driver Webapp/manifest.json',
    // Add more assets as needed
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return Promise.all(urlsToCache.map(url => 
                    fetch(url).then(response => {
                        if (!response.ok) {
                            console.error(`Failed to fetch ${url}, status: ${response.status}`);
                            throw new Error(`Failed to fetch ${url}`);
                        }
                        return cache.put(url, response);
                    })
                ));
            })
            .catch(error => {
                console.error('Cache addAll failed:', error);
            })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response from cache
                if (response) {
                    return response;
                }
                return fetch(event.request); // Fallback to network
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
