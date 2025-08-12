const myLibrary = [];

function Book(name, author, numberOfPages, read) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.numberOfPages = numberOfPages
    this.read = read;

}

function addBookToLibrary(name, author) {
    const newBook = new Book(name, author);
    myLibrary.unshift(newBook);
}

const exampleBook1 = new Book("Harry Potter", "J.K.Rowling", 345, true);
const exampleBook2 = new Book("Lord of the rings", "John Tolkien", 433, false);
const exampleBook3 = new Book("IT", "Steven King", 424, true);

myLibrary.unshift(exampleBook1);
myLibrary.unshift(exampleBook2);
myLibrary.unshift(exampleBook3);

loadBooks();

function loadBooks() {

    const cards = document.querySelector(".cards");
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        const nameOfBook = document.createElement("h2");

        const closeSpan = document.createElement("span");
        closeSpan.textContent = "🗑️";
        closeSpan.classList.add("close-book");

        const authorOfBook = document.createElement("h3");
        const numberOfPages = document.createElement("p");
        const readBook = document.createElement("h3"); 
        
        nameOfBook.textContent = book.name;

        nameOfBook.appendChild(closeSpan);

        authorOfBook.textContent = book.author;
        numberOfPages.textContent = `Pages: ${book.numberOfPages}`;
        
        if (book.read == true) {
            readBook.textContent = `✓ read`;
            readBook.classList.add("read");

        }
        else if (book.read == false) {
            readBook.textContent = `X unread`;
            readBook.classList.add("unread");

        }
        else {
            readBook.textContent = `whaat`;
            readBook.classList.add("unread");
        }

        card.appendChild(nameOfBook);
        card.appendChild(authorOfBook);
        card.appendChild(numberOfPages);
        card.appendChild(readBook);

        card.classList.add("card");

        cards.appendChild(card);

    });
}

const newBook = document.querySelector(".new-book");
const dialog = document.querySelector("dialog");
const addBook = document.querySelector(".new-book-added");

const closeDialog = document.querySelector("#dialog-close");

newBook.addEventListener("click", () => {
    dialog.showModal();    
    const form = document.querySelector("#new-book-form");
    form.reset();
});

closeDialog.addEventListener("click", () => {
    dialog.close();    
});

addBook.addEventListener("click", () =>{
    const formData = Array.from(document.querySelector("#new-book-form"))
  .filter(input => !(input.type === "radio" && !input.checked)) // махаме не-избраните радио бутони
  .reduce((acc, input) => ({ ...acc, [input.id || input.name]: input.value }), {});

    const formRead = formData.read === "true";

    const addedBook = new Book(formData.title, formData.author, formData.pages, formRead);
    myLibrary.unshift(addedBook);
    
    loadBooks();
});

const closeCard = document.querySelectorAll(".close-book");

closeCard.forEach(closeButton => {
    closeButton.addEventListener("click", () => {
        myLibrary.forEach(book => {
            if (book.name == closeButton.parentElement.textContent.slice(0,-3)) {
                const index = myLibrary.indexOf(book.title == closeButton.parentElement.textContent);
                myLibrary.splice(index, 1);
            }
        });
        closeButton.parentElement.parentElement.remove();
    });
});
