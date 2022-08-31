let myOwnLibrary;

function createLocalForage() {
    createDatabase();
}

function createDatabase() {
    myOwnLibrary = localforage.createInstance({
        name: "bookmarker"
    });
}

function makeBook(name, author, series, pages, currentPage, list) {
    return {
        name : name,
        author : author,
        series : series,
        pages : pages,
        currentPage : currentPage,
        list : list
    }
}

function setBookInIndexedDB(book) {
    myOwnLibrary.setItem(book.name, book);
}