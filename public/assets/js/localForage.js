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

function updateInIndexedDB(oldtitle, book) {
    deleteBook(oldtitle)
    myOwnLibrary.setItem(book.name, book);
}

function deleteInIndexedDB(book) {
    myOwnLibrary.removeItem(book);
}