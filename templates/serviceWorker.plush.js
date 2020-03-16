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
]

let ignoreMethod = ['POST', 'DELETE', 'PUT'];
// if(!ignoreMethod.includes(evt.request.method)) {
//
// }


let CACHE = 'cache-update-and-refresh';


self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(caches.open(CACHE).then(function (cache) {
        cache.addAll([
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
        ]);
    }));
});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.');

    if(!ignoreMethod.includes(evt.request.method)) {
        evt.waitUntil(
            update(evt.request)
                .then(refresh)
        );
        evt.respondWith(fromCache(evt.request));
    }
});

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request);
    });
}

function update(request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            if(!ignoreMethod.includes(request.method)) {
                return cache.put(request, response.clone()).then(function () {
                    return response;
                });
            }
        });
    });
}

function refresh(response) {
    return self.clients.matchAll().then(function (clients) {
        clients.forEach(function (client) {
            let message = {
                type: 'refresh',
                url: response.url,
                eTag: response.headers.get('ETag')
            };
            client.postMessage(JSON.stringify(message));
        });
    });
}