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
  const libraryStatsElement = document.querySelector(".libraryStats");
  const bookInputValues = {authorName, bookName, bookPages, bookReadStatus};

  return {bookInputModal, addNewBookBtn, bookInputCancelBtn, submitBook, 
    bookInputValues, bookListElement, libraryStatsElement};
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

  deleteBtn.addEventListener("click", () => {
    Book.deleteBookCard();
  });
  toggleBookReadStatus.addEventListener("click", () => {
    Book.toggleReadStatus();  
  });

  
  [deleteBtn, authorNamePara, bookNamePara, bookPagesPara, toggleBookReadStatus].
    forEach((item) => bookCardDiv.appendChild(item));
  return bookCardDiv;
}


class LocalStorage {
  
  static publishBookFromLocal() {
    const localBooks = localStorage.getItem("allBooks");
    const books = (localBooks) ? JSON.parse(localBooks) : null;
    if (books) {
      books.forEach(book => createBook(book));
    }
  }

  static setBooks() {
    localStorage.setItem("allBooks", library.allBooks);
  }

  static getBooks() {
    const localBooks = localStorage.getItem("allBooks");
    const books = (localBooks) ? JSON.parse(localBooks) : null;
    return books;
  }

  static isBookInLocalStorage(allBooks, book) {
    const authorName = book.authorName;
    const bookName = book.bookName;
    const duplicateBook = allBooks.filter(item => {
      const author = item.authorName;
      const book = item.bookName;

      return (author === authorName && book === bookName) ? item : null;
    })

    return (duplicateBook.length > 0) ? false : true;
  }

  static addBook(newBook) {
    const localBooks = localStorage.getItem("allBooks");
    const books = (localBooks) ? JSON.parse(localBooks) : [];
    const bookInLocalStorage = this.isBookInLocalStorage(books, newBook);    
    if (bookInLocalStorage) {
      books.push(newBook);
      localStorage.setItem("allBooks", JSON.stringify(books));
    }
  }

  static deleteBook(bookId) {
    const localBooks = JSON.parse(localStorage.getItem("allBooks"));
    //const books = (localBooks) ? JSON.parse(localBooks);
    localBooks.splice(bookId - 1, 1);
    localStorage.setItem("allBooks", JSON.stringify(localBooks));
  }

  static shiftBooksId(bookId) {
    const localBooks = JSON.parse(localStorage.getItem("allBooks"));
    //const books = (localBooks) ? JSON.parse(localBooks);
    const booksLength = localBooks.length;
    
    for (let i= bookId - 1; i < booksLength; i+= 1) {
      localBooks[i].id -= 1;
    }

    localStorage.setItem("allBooks", JSON.stringify(localBooks));
  }

  static updateReadStatus(bookId) {
    const localBooks = localStorage.getItem("allBooks");
    const books = JSON.parse(localBooks);
    books.forEach(book => {
      if (book.id === bookId) {
        book.bookReadStatus = !book.bookReadStatus;
      }
    })
    console.log(books);
    console.log(library.allBooks);
    localStorage.setItem("allBooks", JSON.stringify(books));
  }
};


const CreateLibrary = function() {
  this.allBooks = [];
  
  this.isBookInLibrary = function(newBook) {
    const newBookAuthor = newBook.authorName.toLowerCase();
    const newBookName = newBook.bookName.toLowerCase();

    const duplicateBook = this.allBooks.filter(book => {
      const bookAuthor = book.authorName.toLowerCase();
      const bookName = book.bookName.toLowerCase();

      if ((bookAuthor === newBookAuthor && bookName === newBookName)) {
        return newBook;
      }
    });

    return (duplicateBook.length > 0) ? false : true;
  }

  this.addBook = function(newBook) {
     this.allBooks.push(newBook);
  };

  this.removeBook = function(bookId) {
    this.allBooks.splice(bookId - 1, 1);
  };

  this.updateBookReadStatus = function(bookId) {
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

  this.bookStats = function() {
    let {libraryStatsElement} = domElements();
    let readBooks = 0;
    let totalBooks = this.allBooks.length;
    let totalAuthorRead = 0;

    this.allBooks.forEach(book  =>  {
      (book.bookReadStatus === true) ? readBooks += 1 : null;  
    });
 
    let uniqueAuthors = this.allBooks.map(book => book.authorName);
    totalAuthorRead = new Set(uniqueAuthors);

    let notReadBooks = totalBooks - readBooks;

    libraryStatsElement.children[0].textContent = `Authors: ${totalAuthorRead.size}`;
    libraryStatsElement.children[1].textContent = `Books: ${totalBooks}`;
    libraryStatsElement.children[2].textContent = `Books read: ${readBooks}`;
    libraryStatsElement.children[3].textContent = `Books not read: ${notReadBooks}`;
  }
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
    bookCardDiv.children[1].textContent = `Author: ${newBook.authorName}`;
    bookCardDiv.children[2].textContent = `Book: ${newBook.bookName}`;
    bookCardDiv.children[3].textContent = `Pages: ${newBook.bookPages}`;

    bookCardDiv.children[4].textContent = `Read? ${(newBook.bookReadStatus === true) ? "Yes!" : "No!"}`;
    bookCardDiv.classList.add(newBook.id); 
    bookListElement.appendChild(bookCardDiv);
    library.bookStats()
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
    library.bookStats();
    LocalStorage.updateReadStatus(bookId);
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
    library.bookStats();
    this.updateDomBookIds(bookList, bookId);
    LocalStorage.deleteBook(bookId);
    LocalStorage.shiftBooksId(bookId);
  }
}


const createBook = function(bookInputValues) {
  const {bookListElement} = domElements();
  const bookCardDiv = makeBookCardUi();
  
  const bookId = library.generateBookId();

  bookInputValues.id = bookId;
  const newBook = new Book({...bookInputValues});
  const isBookInLibrary = library.isBookInLibrary(newBook);
  if (isBookInLibrary) {
    library.addBook(newBook);
    Book.publishBookToWebPage(newBook, bookCardDiv, bookListElement);
    library.bookStats();
    LocalStorage.addBook(newBook);
  };
}


const domInteractions = function() {
  let {bookInputModal, addNewBookBtn, bookInputCancelBtn, submitBook, bookInputValues} = domElements();
  

  addNewBookBtn.addEventListener("click",  () => bookInputModal.showModal());
  
  bookInputCancelBtn.addEventListener("click", () => bookInputModal.close());

  submitBook.addEventListener("click", () => {
    const {authorName, bookName, bookPages, bookReadStatus} = {...bookInputValues};
    const bookValues = {authorName: authorName.value, 
                             bookName: bookName.value, 
                             bookPages: bookPages.value, 
                             bookReadStatus: bookReadStatus.checked};

    bookInputModal.close();   
    createBook(bookValues);
  });
};


const library = new CreateLibrary;
LocalStorage.publishBookFromLocal();
domInteractions();

