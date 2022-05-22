"use strict"
const myLibrary = [];


const Book = function(bookName="unknown", author="unknown", pages=0, isRead=false, id) {
  return {bookName, author, pages, isRead, id};
}


const addBookToMyLibrary = function(...args) {
  const [author, book, pages, isRead, id] = [...args]; 
  const newBook = Book(author, book, pages, isRead, id);
  myLibrary.push(newBook);
  console.log(newBook, myLibrary);
}


const domElements = function() {
  const dialogModal = document.getElementById("bookDetailsModal");
  const addBookBtn = document.querySelector(".addBook");
  const cancelFormBtn = document.querySelector(".cancelButton");
  const submitFormBtn = document.querySelector(".submitBook");
  const authorName = document.getElementById("authorName").value;
  const bookName = document.getElementById("bookName").value;
  const bookPages = document.getElementById("bookPages").value;
  const isBookRead = document.getElementById("isBookRead").checked;
  
  let id = 0;
  
  addBookBtn.addEventListener("click", () => dialogModal.showModal());
  cancelFormBtn.addEventListener("click", () => dialogModal.close());
  submitFormBtn.addEventListener("click", () => {
    dialogModal.close();
    addBookToMyLibrary(authorName, bookName, bookPages, isBookRead, id);
    id += 1;
  });
};

domElements();
