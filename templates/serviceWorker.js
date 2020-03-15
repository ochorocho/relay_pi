let cacheName = 'v2';
let cacheFiles = [
    '/',
    '/groups/',
    '/devices/',
    '/pins/',
    '/assets/images/logo.svg',
    '/assets/images/manifest-logo.svg',
    '/assets/application.css',
    '/assets/application.js',
    '/assets/icon/iconfont.eot',
    '/assets/icon/iconfont.svg',
    '/assets/icon/iconfont.ttf',
    '/assets/icon/iconfont.woff',
    '/assets/font/Oswald-VariableFont_wght.ttf',
    '/api/groups/',
    '/api/devices/',
    '/api/pins/',
]

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');

    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                if (thisCacheName !== cacheName) {
                    console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }));
        })
    );

    return self.clients.claim();
});


self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request)
            .then(function(response) {
                if ( response ) {
                    console.log("[ServiceWorker] Found in Cache", e.request.url);
                    return response;
                } else {
                    console.log("[ServiceWorker] Not found in cache ... ", e.request.url);
                }

                let requestClone = e.request.clone();
                return fetch(requestClone)
                    .then(function(response) {

                        if ( !response ) {
                            console.log("[ServiceWorker] No response from fetch ")
                            return response;
                        }

                        let responseClone = response.clone();

                        caches.open(cacheName).then(function(cache) {
                            cache.put(e.request, responseClone);
                            console.log('[ServiceWorker] New Data Cached', e.request.url);
                            return response;

                        });

                    })
                    .catch(function(err) {
                        console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
                    });
            })
    );
});