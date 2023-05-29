document.addEventListener("DOMContentLoaded", init);

function init() {
    registerServiceWorker();
    createLocalForage();
    fillLists();

    document.querySelectorAll('nav a').forEach(el => el.addEventListener('click', handleAddButton));
    document.querySelector('#add-button').addEventListener('click', openForm);
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

function fillLists() {
    myOwnLibrary.keys()
        .then(function(keys) {
            return Promise.all(keys.map(book => myOwnLibrary.getItem(book)));
        })
        .then(function(books) {
            // Sort the books by author
            books.sort(function(a, b) {
                if (a.author < b.author) {
                    return -1;
                }
                if (a.author > b.author) {
                    return 1;
                }
                return 0;
            });

            // Display the sorted books
            books.forEach(function(value) {
                const insertBook = `<div class="bookclass">
                    <div>
                    <h3>${value.name}</h3>
                    <p class="bookauthor">${value.author}</p>
                    </div>
                    ${checkForPages(value)}</div>`;

                if (value.list === "past") {
                    document.querySelector("#have-red .booklist").insertAdjacentHTML('beforeend', insertBook);
                } else if (value.list === "now") {
                    document.querySelector("#reading .booklist").insertAdjacentHTML('beforeend', insertBook);
                } else if (value.list === "future") {
                    document.querySelector("#to-read .booklist").insertAdjacentHTML('beforeend', insertBook);
                }
            });

            // Add event listeners
            document.querySelectorAll("#reading .booklist").forEach(el => el.addEventListener("click", openForm));
            document.querySelectorAll("#have-red .booklist").forEach(el => el.addEventListener("click", openForm));
            document.querySelectorAll("#to-read .booklist").forEach(el => el.addEventListener("click", openForm));
        })
        .catch(function(err) {
            console.log(err);
        });
}


function checkForPages(book) {
    if (book.currentPage !== "") {
        return `<p>${book.currentPage}/${book.pages}</p>`
    }
    else {
        return `<p>${book.pages}</p>`
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








