let myLibrary = [];

const cardContainer = document.querySelector('.card-container');
const newBookBtn = document.querySelector('.new-book-btn');
const closeBtn = document.querySelector('.close-btn');
const formWrapper = document.querySelector('.form-wrapper');

function Book(title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach((book) => {
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
    card.appendChild(isRead);

    cardContainer.appendChild(card);
  });
}

function displayNewBookForm() {
  formWrapper.style.display = 'flex';
  console.log('test');
}

function closeForm() {
  formWrapper.style.display = 'none';
}

newBookBtn.addEventListener('click', displayNewBookForm);
closeBtn.addEventListener('click', closeForm);
formWrapper.addEventListener('click', (e) => {
  if (e.target == formWrapper) closeForm();
})

const book1 = new Book("Test Book", "John E. Doe", 365, true);
const book2 = new Book("Best Took2", "Dohn E. Joe", 300, false);
const book3 = new Book("Test Book3", "John E. Doe", 365, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

displayBooks();
