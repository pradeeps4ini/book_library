"use strict"
const myLibrary = [];


const Book = function(bookName="unknown", author="unknown", pages=0, isRead=false) {
  let bookId;
  bookId += 1;
  return {bookName, author, pages, isRead};
}


const addBookToMyLibrary = function(...args) {
  console.log(args)
  const [author, book, pages, isRead] = [...args]; 
  const newBook = Book(author, book, pages, isRead);
  myLibrary.push(newBook);
}


const domElements = function() {
  const dialogModal = document.getElementById("bookDetailsModal");
  const addBookBtn = document.querySelector(".addBook");
  const cancelFormBtn = document.querySelector(".cancelButton");
  const submitFormBtn = document.querySelector(".submitBook");
  const authorName = document.getElementById("authorName").value;
  const bookName = document.getElementById("bookName").value;
  const bookPages = document.getElementById("bookPages").value;
  const isBookRead = document.getElementById("isBookRead").value;

  addBookBtn.addEventListener("click", () => dialogModal.showModal());
  cancelFormBtn.addEventListener("click", () => dialogModal.close());
  submitFormBtn.addEventListener("click", (e) => {
    const authorName = document.getElementById("authorName").value;
    const bookName = document.getElementById("bookName").value;
    const bookPages = document.getElementById("bookPages").value;
    const isBookRead = document.getElementById("isBookRead").value;
    
    dialogModal.close();
    addBookToMyLibrary(authorName, bookName, bookPages, isBookRead);
  });
};

domElements();
