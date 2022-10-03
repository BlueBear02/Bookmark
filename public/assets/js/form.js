let action = "";
let title = "";

let name = "";
let author = "";
let series = "";
let pages = "";
let cpage = "";
let list = "";

//-----DISPLAYING THE RIGHT FORM-----

function openForm(e) {
    emptyFormPage();
    const addCheck = e.target.getAttribute("data-target");

    if (addCheck === "add-form") {
        useAddForm();
        directNavigation("form-section");
    }
    else {
        useUpdateForm();
        getBookFromDB(e);
    }
}

function useAddForm() {
    let top = `<h2>Add a book</h2>`;
    let body = addUniversalForm();
    let bottom = `<div id="confirmbook">Add</div></form></div>`;
    let final = top + body + bottom;
    showForm(final);
    action = "add";
    document.querySelector('#confirmbook').addEventListener('click', useForm);
}

function useUpdateForm() {
    let top = `<h2>Edit a book</h2>`;
    let body = addUniversalForm();
    let bottom = `<div id="updatebook">Update</div>
                    <div id="deletebook">Delete book</div>
                    </form>
                    </div>`;
    let final = top + body + bottom;
    showForm(final);
    document.querySelector('#deletebook').addEventListener('click', deleteBook);
}

function showForm(form) {
    document.querySelector('#form-section').insertAdjacentHTML('beforeend', form);
}

function getBookFromDB(e) {
    title = e.target.closest("div").querySelector("h3").innerHTML;
    myOwnLibrary.getItem(title, function(err, value) {
        directNavigation("form-section");
        fillForm(value);
    });
    action = "update";
    document.querySelector('#updatebook').addEventListener('click', useForm);
}

function fillForm(book) {
    document.querySelector("#name").value = book.name;
    document.querySelector("#author").value = book.author;
    document.querySelector("#series").value = book.series;
    document.querySelector("#pages").value = book.pages;
    document.querySelector("#currentpages").value = book.currentPage;
    document.querySelector("#list").value = book.list;
}

function addUniversalForm() {
    return `<div class="booklist border-gradient-purple">
                <form>
                  <p class="required-text">* = required field</p>
                  <label for="name">*Name:</label>
                  <p id="forgotname-add"></p>
                  <input type="text" name="name" id="name" placeholder="Philosopher's Stone"/>
        
                  <label for="author">Author:</label>
                  <input type="text" name="author" id="author" placeholder="J. K. Rowling"/>
        
                  <label for="series">Series:</label>
                  <input type="text" name="series" id="series" placeholder="Harry Potter"/>
        
                  <label for="pages">Pages:</label>
                  <input type="number" name="pages" id="pages" placeholder="223"/>
        
                  <label for="currentpages">Current page:</label>
                  <input type="number" name="currentpages" id="currentpages" placeholder="0"/>
        
                  <label for="list">List:</label>
                  <select name="list" id="list">
                    <option value="future">Want to read</option>
                    <option value="now">Am reading</option>
                    <option value="past">Have read</option>
                  </select>`;
}

//-----FORM FUNCTIONALITIES-----

function useForm() {
    if (checkIfNameIsGiven()) {
        formAction();
    }
    else {
        document.querySelector("#forgotname-add").innerHTML = "please fill in this field!";
    }
}

function formAction() {
    getValuesInForm()
    if (action === "add") {
        addBook();
    }
    else if (action === "update") {
        updateBook();
    }
    clearForm();
}

function addBook() {
    setBookInIndexedDB(makeBook(name, author, series, pages, cpage, list));
}

function updateBook() {
    if (cpage === pages || cpage >= pages) {
        updateInIndexedDB(title, makeBook(name, author, series, pages, cpage, "past"));
    }else {
        updateInIndexedDB(title, makeBook(name, author, series, pages, cpage, list));
    }
}

function deleteBook() {
    deleteInIndexedDB(title);
    clearForm();
}

function checkIfNameIsGiven() {
    return document.querySelector("#name").value !== "";
}

function getValuesInForm() {
    name = document.querySelector("#name").value;
    author = document.querySelector("#author").value;
    series = document.querySelector("#series").value;
    pages = document.querySelector("#pages").value;
    cpage = document.querySelector("#currentpages").value;
    list = document.querySelector("#list").value;
}

//-----CLEARING THE FORM-----

function clearForm() {
    emptyFormPage();
    location.reload();
}

function emptyFormPage() {
    document.querySelector("#form-section").innerHTML = "";
}