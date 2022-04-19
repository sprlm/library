let myLibrary = [];
let cardId = 0;

const cardContainer = document.querySelector('.card-container');
const formWrapper = document.querySelector('.form-wrapper');

const newBookBtn = document.querySelector('.new-book-btn');
const addBtn = document.querySelector('.form-btn');
const closeBtn = document.querySelector('.close-btn');

const addBookForm = document.querySelector('.add-book-form');

function Book(title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

Book.prototype.changeReadStatus = function() {
  this.isRead = !this.isRead;
};

function getElementIndex(node) {
  let index = 0;
  while (node = node.previousElementSibling) {
    index++;
  }
  return index;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addBookToDOM(book) {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h2');
  title.classList.add('title');
  title.textContent = book.title;
  card.appendChild(title);

  const author = document.createElement('h4');
  author.classList.add('author');
  author.textContent = book.author;
  card.appendChild(author);

  const numPages = document.createElement('div');
  numPages.classList.add('num-pages');
  numPages.textContent = book.numPages;
  card.appendChild(numPages);

  const isRead = document.createElement('div');
  isRead.classList.add('is-read');
  isRead.textContent = (book.isRead) ? 'Read!' : 'Not read.';
  isRead.addEventListener('click', (e) => {
    const bookIndex = getElementIndex(e.target.parentElement);
    myLibrary[bookIndex].changeReadStatus();
    displayBooks();
  })
  card.appendChild(isRead);

  const close = document.createElement('div');
  close.classList.add('close-btn');
  close.textContent = '✕';
  close.addEventListener('click', (e) => {
    const cardToDelete = e.target.parentElement;
    const cardIndex = getElementIndex(cardToDelete);
    myLibrary.splice(cardIndex, 1);
    displayBooks();
  });
  card.appendChild(close);

  cardContainer.appendChild(card);
}

function displayBooks() {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  myLibrary.forEach((book) => {
    addBookToDOM(book);
  });
}

function displayNewBookForm() {
  formWrapper.style.display = 'flex';
}

function closeForm() {
  formWrapper.style.display = 'none';
}

function getBookFromForm() {
  let title = addBookForm.elements[0].value;
  let author = addBookForm.elements[1].value;
  let numPages = addBookForm.elements[2].value;
  let isRead = document.querySelector('.form-checkbox').checked;
  
  if (title === '') title = "Unknown Title";
  if (author === '') author = "Unknown Author";
  if (numPages === '') numPages = "Unknown Page Count";

  return new Book(title, author, numPages, isRead);
}

newBookBtn.addEventListener('click', displayNewBookForm);

addBtn.addEventListener('click', () => {
  const book = getBookFromForm();

  addBookToLibrary(book);
  displayBooks();

  addBookForm.reset();
  closeForm();
});

closeBtn.addEventListener('click', closeForm);

formWrapper.addEventListener('click', (e) => {
  if (e.target == formWrapper) closeForm();
});
