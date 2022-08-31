document.addEventListener("DOMContentLoaded", init);

function init() {
    registerServiceWorker();
    document.querySelectorAll('nav a').forEach(el => el.addEventListener('click', handleNavigation));
    document.querySelector('span').addEventListener('click', openNav);
    document.querySelector('#closebtn').addEventListener('click', closeNav);
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

function openNav() {
    document.getElementById("sidenav").style.width = "50%";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}