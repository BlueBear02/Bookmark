"use strict";

let currentPage = "reading";

function handleNavigation(e) {
    e.preventDefault();
    if (e.target.getAttribute("data-target") !== ""){
        const targetPage = e.target.getAttribute("data-target");

        switchPage(currentPage, targetPage);

        currentPage = targetPage;
    }
}

/*function directNavigation(targetPage) {
    switchPage(currentPage, targetPage);
    currentPage = targetPage;
}*/

function switchPage(previousPage,nextPage){
    document.querySelector('#' + previousPage).classList.toggle('hidden');
    document.querySelector('#' + nextPage).classList.toggle('hidden');
    closeNav();
}