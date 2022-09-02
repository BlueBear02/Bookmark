document.addEventListener("DOMContentLoaded", init);

function init() {
    registerServiceWorker();
    createLocalForage();
    fillLists();

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
        document.querySelector("#forgotname-add").innerHTML = "please fill in this field!";
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
    document.querySelector("#forgotname-edit, #forgotname-add").innerHTML = "";
    location.reload();
}

function fillLists() {
    myOwnLibrary.keys().then(function(keys) {
        keys.forEach(book => myOwnLibrary.getItem(book).then(function(value) {
            if (value.list === "past") {
                const insertBook =
                    `<div class="bookclass">
                    <div>
                    <h3>${value.name}</h3>
                    <p class="bookauthor">${value.author}</p>
                    </div>
                    <p>${value.pages}</p></div>`;
                document.querySelector("#have-red .booklist").insertAdjacentHTML('beforeend', insertBook);
            }
            if (value.list === "now") {
                const insertBook =
                    `<div class="bookclass">
                    <div>
                    <h3>${value.name}</h3>
                    <p class="bookauthor">${value.author}</p>
                    </div>
                    ${checkForPages(value)}</div>`;
                document.querySelector("#reading .booklist").insertAdjacentHTML('beforeend', insertBook);
            }
            if (value.list === "future") {
                const insertBook =
                    `<div class="bookclass">
                    <div>
                    <h3>${value.name}</h3>
                    <p class="bookauthor">${value.author}</p>
                    </div>
                    <p>${value.pages}</p></div>`;
                document.querySelector("#to-read .booklist").insertAdjacentHTML('beforeend', insertBook);
            }
        }).catch(function(err) {
            console.log(err);
        }))
    }).catch(function(err) {
        console.log(err);
    });
    document.querySelectorAll("#reading .booklist").forEach(el => el.addEventListener("click", editBook));
    document.querySelectorAll("#have-red .booklist").forEach(el => el.addEventListener("click", editBook));
    document.querySelectorAll("#to-read .booklist").forEach(el => el.addEventListener("click", editBook));
}

function checkForPages(book) {
    if (book.currentPage !== "") {
        return `<p>${book.currentPage}/${book.pages}</p>`
    }
    else {
        return `<p>${book.pages}</p>`
    }
}

function editBook(e) {
    const title = e.target.closest("div").querySelector("h3").innerHTML;
    myOwnLibrary.getItem(title, function(err, value) {
        directNavigation("edit-book");
        fillForm(value);
    });
    document.querySelector("#updatebook").addEventListener("click", updateDB(title));
}

function updateDB(title) {
    console.log(title);
    if (checkRequiredUpdate()) {
        getUpdateBookValues(title);
    }
    else {
        document.querySelectorAll("#forgotname-edit").innerHTML = "please fill in this field!";
    }
}

function getUpdateBookValues(title) {
    let name = document.querySelector("#ename").value;
    let author = document.querySelector("#eauthor").value;
    let series = document.querySelector("#eseries").value;
    let pages = document.querySelector("#epages").value;
    let cpage = document.querySelector("#ecurrentpages").value;
    let list = document.querySelector("#elist").value;
    updateInIndexedDB(title, makeBook(name, author, series, pages, cpage, list));
    clearForm();
}

function checkRequiredUpdate() {
    if (document.querySelector("#ename").value !== "") {
        return true
    }
    else {
        return false
    }
}

function fillForm(book) {
    document.querySelector("#ename").value = book.name;
    document.querySelector("#eauthor").value = book.author;
    document.querySelector("#eseries").value = book.series;
    document.querySelector("#epages").value = book.pages;
    document.querySelector("#ecurrentpages").value = book.currentPage;
    document.querySelector("#elist").value = book.list;
}
