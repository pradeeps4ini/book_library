"use strict";


const domElements = function() {
  const bookInputModal = document.getElementById("bookInputModal");
  const addNewBookBtn = document.querySelector(".addNewBook");
  const bookInputCancelBtn = document.querySelector(".bookInputCancelBtn");
  const submitBook = document.getElementById("submitBook");
  const authorName = document.getElementById("authorName");
  const bookName = document.getElementById("bookName");
  const bookPages = document.getElementById("bookPages");
  const bookReadStatus = document.getElementById("isBookRead");
  const bookListElement = document.getElementById("bookList");

  const bookInputValues = {authorName, bookName, bookPages, bookReadStatus};

  return {bookInputModal, addNewBookBtn, bookInputCancelBtn, submitBook, 
    bookInputValues, bookListElement};
}


const createElement = function(element) {
  return document.createElement(element);
} 


const makeBookCardUi = function() {
  const bookCardDiv = createElement("div");
  
  const authorNamePara = createElement("p");
  const bookNamePara = createElement("p");
  const bookPagesPara = createElement("p");
  const toggleBookReadStatus = createElement("button");

  const deleteImg = createElement("img");
  const deleteBtn = createElement("button");
  deleteImg.setAttribute("src", "./images/bin.png");
  deleteImg.setAttribute("alt", "delete book button");
  deleteBtn.appendChild(deleteImg);
  deleteBtn.setAttribute("class", "deleteBookCard");
  deleteBtn.setAttribute("type", "button");

  deleteBtn.addEventListener("click", Book.deleteBookCard);
  toggleBookReadStatus.addEventListener("click", () => {
    Book.toggleReadStatus();  
  });

  
  [deleteBtn, authorNamePara, bookNamePara, bookPagesPara, toggleBookReadStatus].
    forEach((item) => bookCardDiv.appendChild(item));
  return bookCardDiv;
}


const CreateLibrary = function() {
  this.allBooks = [];

  this.addBook = function(newBook) {
    if (!(newBook in this.allBooks)) {
      this.allBooks.push(newBook);
    }  
  };

  this.removeBook = function(bookId) {
    this.allBooks.splice(bookId - 1, 1);
  };

  this.updateBookReadStatus = function(bookId) {
    console.log(bookId)
    this.allBooks.forEach((book) => {
      if (book.id === bookId) {
        book.bookReadStatus = !book.bookReadStatus;}
    })
  };

  this.shiftBooksId = function(lastRemovedBookId) {
    let allBooksLength = this.allBooks.length;
   
    for (let i= lastRemovedBookId - 1; i< allBooksLength; i+= 1) {
      this.allBooks[i].id -= 1;  
    }
  };

  this.generateBookId = function() {
    const id = (this.allBooks.length) + 1;
    return id;
  };
}; 


class Book {

  constructor({authorName, bookName, bookPages, bookReadStatus, id}) {
    this.authorName = authorName;
    this.bookName = bookName;
    this.bookPages = bookPages;
    this.bookReadStatus = bookReadStatus;
    this.id = id;
  }
  
  static publishBookToWebPage = function(newBook, bookCardDiv,  bookListElement) {
    console.log(newBook)
    bookCardDiv.children[1].textContent = `Author: ${newBook.authorName}`;
    bookCardDiv.children[2].textContent = `Book: ${newBook.bookName}`;
    bookCardDiv.children[3].textContent = `Pages: ${newBook.bookPages}`;

    bookCardDiv.children[4].textContent = `Read? ${(newBook.bookReadStatus === true) ? "Yes!" : "No!"}`;
    bookCardDiv.classList.add(newBook.id); 
    bookListElement.appendChild(bookCardDiv);
  }
  static updateDomBookIds = function(domBookList, bookId) {
    const domBookLength = domBookList.children.length;

    for (let i = bookId - 1; i< domBookLength; i+= 1) {
      domBookList.children[i].className = i + 1;
    }
  }

  static toggleReadStatus = function() {
    event.target.textContent = event.target.textContent.includes("No!") ? "Read? Yes!" : "Read? No!";
    const bookId = +event.target.parentNode.className;
    library.updateBookReadStatus(bookId)
  }

  static deleteBookCard = function() {
    let bookDiv = (event.target === event.currentTarget) ? 
                  event.target.parentNode :
                  event.currentTarget.parentNode;

    let bookList = bookDiv.parentNode;
    let bookId = +bookDiv.className;
    bookDiv.remove();
    library.removeBook(bookId);
    library.shiftBooksId(bookId);
    Book.updateDomBookIds(bookList, bookId);
  }
}


const createBook = function(bookInputValues, bookCardDiv, bookListElement) {
  const bookId = library.generateBookId();
  bookInputValues.id = bookId;
  const newBook = new Book({...bookInputValues});
  library.addBook(newBook);
  Book.publishBookToWebPage(newBook, bookCardDiv, bookListElement);
}


const domInteractions = function() {
  let {bookInputModal, addNewBookBtn, bookInputCancelBtn, submitBook, 
    bookInputValues, bookListElement} = domElements();
  

  addNewBookBtn.addEventListener("click",  () => bookInputModal.showModal());
  
  bookInputCancelBtn.addEventListener("click", () => bookInputModal.close());

  submitBook.addEventListener("click", () => {
    const {authorName, bookName, bookPages, bookReadStatus} = {...bookInputValues};
    const bookValues = {authorName: authorName.value, 
                             bookName: bookName.value, 
                             bookPages: bookPages.value, 
                             bookReadStatus: bookReadStatus.checked};
    const bookCardDiv = makeBookCardUi();

    bookInputModal.close();   
    createBook(bookValues, bookCardDiv, bookListElement);
  });
};


const library = new CreateLibrary();
domInteractions();
