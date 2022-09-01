document.addEventListener("DOMContentLoaded", init);

let pastArray=[];
let nowArray=[];
let futureArray=[];

function init() {
    registerServiceWorker();
    createLocalForage();
    fillArrays();
    document.querySelectorAll('nav a').forEach(el => el.addEventListener('click', handleAddButton));
    document.querySelector('#add-button').addEventListener('click', handleAddButton);
    document.addEventListener('click', checkIfClickedAnything);
    document.querySelector('#confirmbook').addEventListener('click', addBook);
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

function addBook() {
    if (checkRequired()) {
        getBookValues();
    }
    else {
        document.querySelector("#forgotname").innerHTML = "please fill in this field!";
    }
}

function checkRequired() {
    if (document.querySelector("#name").value !== "") {
        return true
    }
    else {
        return false
    }
}

function getBookValues() {
    let name = document.querySelector("#name").value;
    let author = document.querySelector("#author").value;
    let series = document.querySelector("#series").value;
    let pages = document.querySelector("#pages").value;
    let cpage = document.querySelector("#currentpages").value;
    let list = document.querySelector("#list").value;
    setBookInIndexedDB(makeBook(name, author, series, pages, cpage, list));
    clearForm();
}

function clearForm() {
    document.querySelector("#name").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#series").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#currentpages").value = "";
    document.querySelector("#list").value = "future";
}

function fillArrays() {
    myOwnLibrary.keys().then(function(keys) {
        keys.forEach(book => myOwnLibrary.getItem(book).then(function(value) {
            if (value.list === "past") {
                pastArray.push(value);
            }
            if (value.list === "now") {
                nowArray.push(value);
            }
            if (value.list === "future") {
                futureArray.push(value);
            }
        }).catch(function(err) {
            console.log(err);
        }))
    }).catch(function(err) {
        console.log(err);
    });
}