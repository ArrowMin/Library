const myLibrary = [];

function Book(author, title, pages, read, genre, year) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  if (read) {
    this.read = "Yes";
  } else {
    this.read = "No";
  }
  this.genre = genre;
  this.year = year;
}

Book.prototype.changeRead = function () {
  if (this.read == "Yes") {
    this.read = "No";
  } else {
    this.read = "Yes";
  }
};

const book1 = new Book("George Orwell", "1984", 328, true, "Dystopian", 1949);
const book2 = new Book(
  "Harper Lee",
  "To Kill a Mockingbird",
  281,
  false,
  "Fiction",
  1960
);
const book3 = new Book(
  "J.K. Rowling",
  "Harry Potter and the Sorcerer's Stone",
  309,
  true,
  "Fantasy",
  1997
);
/*
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

console.log(myLibrary);
*/
function displayLibrary(library) {
  const container = document.getElementById("bookContainer");
  container.innerHTML = "";
  library.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    //Create the book info section
    const bookInfoHolder = document.createElement("div");
    bookInfoHolder.classList.add("bookInfoHolder");
    bookDiv.appendChild(bookInfoHolder);

    const titleElement = document.createElement("div");
    titleElement.textContent = "Title: " + book.title;
    bookInfoHolder.appendChild(titleElement);

    const authorElement = document.createElement("div");
    authorElement.textContent = "Author: " + book.author;
    bookInfoHolder.appendChild(authorElement);

    const pagesElement = document.createElement("div");
    pagesElement.textContent = "Pages: " + book.pages;
    bookInfoHolder.appendChild(pagesElement);

    const genreElement = document.createElement("div");
    genreElement.textContent = "Genre: " + book.genre;
    bookInfoHolder.appendChild(genreElement);

    const yearElement = document.createElement("div");
    yearElement.textContent = "Year Published: " + book.year;
    bookInfoHolder.appendChild(yearElement);

    const readElement = document.createElement("div");
    readElement.textContent = "Read: " + book.read;
    bookInfoHolder.appendChild(readElement);

    //Create the button section
    const bookButtonHolder = document.createElement("div");
    bookButtonHolder.classList.add("bookButtonHolder");
    bookDiv.appendChild(bookButtonHolder);

    const readButton = document.createElement("button");
    readButton.addEventListener("click", () => {
      changeReadStatus(index);
    });

    const removeButton = document.createElement("button");
    removeButton.addEventListener("click", () => {
      removeBookFromLibrary(index);
    });

    //Add first button
    const readSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const readSvgPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    readSvg.setAttribute("viewbox", "0 0 24 24");
    readSvgPath.setAttribute(
      "d",
      "M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z"
    );
    readSvg.appendChild(readSvgPath);
    readButton.appendChild(readSvg);
    //Add second button
    const removeSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const removeSvgPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    removeSvg.setAttribute("viewbox", "0 0 24 24");
    removeSvgPath.setAttribute(
      "d",
      "M13 19C13 20.1 13.3 21.12 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M22.54 16.88L21.12 15.47L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88Z"
    );
    removeSvg.appendChild(removeSvgPath);
    removeButton.appendChild(removeSvg);

    bookButtonHolder.appendChild(readButton);
    bookButtonHolder.appendChild(removeButton);

    container.appendChild(bookDiv);
  });
}

displayLibrary(myLibrary);

const addBookDialog = document.getElementById("addBookDialog");
const addBookButton = document.querySelector(".addBookButton");
const closeDialogButton = document.getElementById("closeDialogButton");

// Event listener to open the dialog
addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

// Event listener to close the dialog
closeDialogButton.addEventListener("click", () => {
  addBookDialog.close();
});

function addBookToLibrary(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value, 10);
  const genre = document.getElementById("genre").value;
  const year = parseInt(document.getElementById("year").value, 10);
  const read = document.getElementById("read").value === "true";

  const newBook = new Book(author, title, pages, read, genre, year);
  myLibrary.push(newBook);

  displayLibrary(myLibrary);
  addBookDialog.close();

  document.getElementById("addBookForm").reset();
}

const addBookForm = document.getElementById("addBookForm");
addBookForm.addEventListener("submit", addBookToLibrary);

function changeReadStatus(index) {
  myLibrary[index].changeRead();
  displayLibrary(myLibrary);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  displayLibrary(myLibrary);
}
