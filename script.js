"use strict"
const myLibrary = [];


const Book = function(bookName="unknown", author="unknown", pages=0, isRead=false) {
  return {bookName, author, pages, isRead};
}


const enterBookDetails = function() {
  const bookName = prompt("Enter book name");
  const author = prompt("Enter author name");
  const pages = prompt("Enter pages");
  const isRead = prompt("is book Read");

  return [bookName, author, pages, isRead];
}


const addBookToMyLibrary = function() {
  let [bookName, author, pages, isRead] = enterBookDetails(); 
  const newBook = Book(bookName, author, pages,  isRead);
  myLibrary.push(newBook);
}


const dialog = document.querySelector("#bookDetailsModal");
const addBook = document.querySelector(".add_book");

addBook.addEventListener('click', dialog.showModal());
