document.addEventListener("DOMContentLoaded", init);

function init() {
    registerServiceWorker();
    createLocalForage();
    document.querySelectorAll('nav a').forEach(el => el.addEventListener('click', handleNavigation));
    document.querySelector('#closebtn').addEventListener('click', closeNav);
    document.addEventListener('click', checkIfClickedAnything);
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

function checkIfClickedAnything(e) {
    let nav = document.getElementById("sidenav");
    if (e.target.nodeName === "SPAN") {
        openNav();
    }
    else if (e.target != nav && e.target.parentNode != nav){
        closeNav();
    }
}