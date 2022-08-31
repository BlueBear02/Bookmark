document.addEventListener("DOMContentLoaded", init);

function init() {
    registerServiceWorker();
    document.querySelectorAll('nav a').forEach(el => el.addEventListener('click', handleNavigation));
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register("/sw.js")
            .then(function(res) {
                console.log("Succesfully registered service worker with scope:", res.scope);
            }).catch(function(err) {
            console.log("Error registering service worker:", err);
        })
    }
}