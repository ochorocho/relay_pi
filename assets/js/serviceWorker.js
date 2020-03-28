// importScripts('/node_modules/workbox-sw/build/workbox-sw.js');

// import {precaching} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {NetworkFirst} from 'workbox-strategies';
// import {BackgroundSyncPlugin} from 'workbox-background-sync';

// import workbox from "workbox-sw"

    registerRoute(
        /\/api\/(.*)\//,
        NetworkFirst({
            networkTimeoutSeconds: 1,
            cacheName: 'api',
        })
    );
    registerRoute(
        /\/assets\/(.*)\//,
        NetworkFirst({
            networkTimeoutSeconds: 1,
            cacheName: 'assets',
        })
    );
    registerRoute(
        /^((?!assets|livereload|api\/).)*$/,
        NetworkFirst({
            networkTimeoutSeconds: 1,
            cacheName: 'pages',
        })
    );