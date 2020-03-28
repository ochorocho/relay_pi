import('./_pages')

window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus(event) {
    var condition = navigator.onLine ? "online" : "offline";
    document.body.className = condition;
}

const env = process.env.NODE_ENV || "development"
env == 'development' && console.log('Node env "' + env + '"')

// if(process.env.NODE_ENV !== 'development') {
// }

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceworker.js', { scope: '/' }).then(registration => {
        }).catch(registrationError => {
            console.log('Failed to register ServiceWorker', registrationError);
        });
    });
}
