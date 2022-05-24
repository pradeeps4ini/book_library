"use strict"


const domElements = function() {
  const dialogModal = document.getElementById("bookDetailsModal");
  const addBookBtn = document.querySelector(".addBook");
  const cancelFormBtn = document.querySelector(".cancelButton");
  const submitFormBtn = document.querySelector(".submitBook");
  const authorName = document.getElementById("authorName");
  const bookName = document.getElementById("bookName");
  const bookPages = document.getElementById("bookPages");
  const isBookRead = document.getElementById("isBookRead");
  const bookCardUi = document.querySelector(".bookCardUi");
  const bookCards = document.querySelector(".bookCards");
  const bookList = document.getElementById("bookList");

  const bookInput = {authorName, bookName, bookPages, isBookRead}; 
  const card = bookCardUi.cloneNode("true");
  card.classList.remove("hidden")
  return {bookInput, addBookBtn, cancelFormBtn, submitFormBtn, dialogModal, card, bookCards, bookList};
};


const shiftBookId = function() {
  myLibrary = myLibrary.map((item) => {

    let newId = (item.id === 0) ? item.id : item.id - 1;
    item = {authorName: item.authorName, bookName: item.bookName, bookPages: item.bookPages, isBookRead: item.isBookRead, id: newId}
    return item;
  })
};


const deleteBookFromLibrary = function() {
  const bookId = event.target.parentNode.classList[0];
  console.log(event.target.parentNode)
  console.log(bookId, "bookId");
  const findBook = document.getElementById(bookId);
  findBook.remove();
  myLibrary.splice(bookId, 1);
  shiftBookId();
}


const createBookCard = function(bookDetails) {
  const {card, bookCards, bookList} = domElements();

  const {0: deleteBook, 1: authorName, 2: bookName, 3: bookPages, 4: isBookRead} = card.children;
  
  authorName.children[1].textContent = bookDetails.authorName;
  bookName.children[1].textContent = bookDetails.bookName;
  bookPages.children[1].textContent = bookDetails.bookPages;
  isBookRead.children[1].textContent = (bookDetails.isBookRead === true) ? "Yes" : "No";
  deleteBook.children[0].addEventListener("click", () => deleteBookFromLibrary()); 
  deleteBook.children[0].setAttribute("class", bookDetails.id);

  card.setAttribute("id", bookDetails.id)
  bookCards.appendChild(card);
  bookList.appendChild(bookCards);
}


const Book = function(authorName="unknown", bookName="unknown", bookPages=0, isBookRead=false, id) {
  return {authorName, bookName, bookPages, isBookRead, id};
}


const createLibrary = function() {
  let library = [];
  let id = 0;  
  const addBookToMyLibrary = function(...args) {
    const [authorName, bookName, bookPages, isBookRead] = [...args];
    const newBook = Book(authorName, bookName, bookPages, isBookRead, id);
    id += 1;

    library.push(newBook);
    createBookCard(newBook);
    
    console.log(library);
  }
  return [library, addBookToMyLibrary];
}


let [myLibrary, addBookToMyLibrary] = createLibrary();


const domInteractions = function() {
  let {bookInput, addBookBtn, cancelFormBtn, submitFormBtn, dialogModal, deleteBook} = domElements();

  addBookBtn.addEventListener("click", () => dialogModal.showModal());

  cancelFormBtn.addEventListener("click", () => dialogModal.close());


  submitFormBtn.addEventListener("click", () => {
    dialogModal.close();
    let {authorName, bookName, bookPages, isBookRead} = bookInput;
    addBookToMyLibrary(authorName.value, bookName.value, bookPages.value, isBookRead.checked);
  });
}

domInteractions();
