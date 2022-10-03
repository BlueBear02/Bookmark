"use strict";

//-----NAVIGATING BETWEEN THE DIFFERENT PAGES-----

let currentPage = "reading";

function handleNavigation(e) {
    e.preventDefault();
    if (e.target.getAttribute("data-target") !== ""){
        const targetPage = e.target.getAttribute("data-target");

        switchPage(currentPage, targetPage);

        currentPage = targetPage;
    }
}

function directNavigation(targetPage) {
    switchPage(currentPage, targetPage);
    currentPage = targetPage;
}

function switchPage(previousPage,nextPage){
    document.querySelector('#' + previousPage).classList.toggle('hidden');
    document.querySelector('#' + nextPage).classList.toggle('hidden');
    closeNav();
}

//-----MAKING THE SIDENAV WORK-----

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
    else if (e.target !== nav && e.target.parentNode !== nav){
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