function logger(text) {
    if('<%= environment %>' === 'development') {
        console.log('[ServiceWorker] ' + text)
    }
}

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
            logger('Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e) {
    logger('Activated');

    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                if (thisCacheName !== cacheName) {
                    logger('Removing Cached Files from Cache - ' + thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }));
        })
    );

    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    logger('Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request)
            .then(function(response) {
                if ( response ) {
                    logger('Found in cache ' + e.request.url);
                    return response;
                } else {
                    logger('Not found in cache ' + e.request.url);
                }

                let requestClone = e.request.clone();
                return fetch(requestClone)
                    .then(function(response) {

                        if ( !response ) {
                            logger('No response from fetch')
                            return response;
                        }

                        let responseClone = response.clone();

                        caches.open(cacheName).then(function(cache) {
                            cache.put(e.request, responseClone);
                            logger('New Data Cached ' + e.request.url);
                            return response;

                        });

                    })
                    .catch(function(err) {
                        logger('Error Fetching & Caching New Data', err);
                    });
            })
    );
});