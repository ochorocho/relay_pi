require('workbox-sw')

if (workbox) {
    workbox.routing.registerRoute(
        /\/api\/(.*)\//,
        workbox.strategies.networkFirst({
            networkTimeoutSeconds: 1,
            cacheName: 'api',
        })
    );
    workbox.routing.registerRoute(
        /\/assets\/(.*)\//,
        workbox.strategies.networkFirst({
            networkTimeoutSeconds: 1,
            cacheName: 'assets',
        })
    );
    workbox.routing.registerRoute(
        /^((?!assets|livereload|api\/).)*$/,
        workbox.strategies.networkFirst({
            networkTimeoutSeconds: 1,
            cacheName: 'pages',
        })
    );
}