document.addEventListener("DOMContentLoaded", init);

function init() {
    registerServiceWorker();
    createLocalForage();
    document.querySelectorAll('nav a').forEach(el => el.addEventListener('click', handleAddButton));
    document.querySelector('#add-button').addEventListener('click', handleAddButton);
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
    changePageShadow();
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0";
    changePageShadow();
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

function changePageShadow() {
    if (document.getElementById("sidenav").style.width === "50%") {
        document.getElementById("sidenav").classList.add("page-shadow");
    }
    else {
        document.getElementById("sidenav").classList.remove("page-shadow");
    }
}

function handleAddButton(e) {
    if (e.target.getAttribute("data-target") !== "make-book") {
        document.querySelector('#add-button').classList.remove('hidden');
        handleNavigation(e);
    }
    else {
        document.querySelector('#add-button').classList.add('hidden');
        handleNavigation(e);
    }
}