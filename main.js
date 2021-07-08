/* global luxon */
// eslint-disable-next-line max-classes-per-file
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class UI {
  constructor() {
    this.savedBook = localStorage.getItem('savedBooks') || [];
    this.bookList = document.getElementById('bookList');
    this.parseBook();
  }

  clearBook() {
    this.savedBook = [];
  }

  addId() {
    return this.savedBook.length;
  }

  returnStoreBook() {
    return this.savedBook;
  }

  parseBook() {
    if (this.savedBook.length > 0) {
      this.savedBook = JSON.parse(localStorage.getItem('savedBooks'));
      this.displayBooks();
    }
  }

  storeBooks(book) {
    this.savedBook.push(book);
    localStorage.setItem('savedBooks', JSON.stringify(this.savedBook));
  }

  removeBook(id) {
    this.savedBook = this.savedBook.filter((obj) => obj.id !== Number(id));
    this.bookList.innerHTML = '';
    this.savedBook.forEach((book) => {
      // eslint-disable-next-line no-use-before-define
      this.displayBooks(book);
    });
    localStorage.setItem('savedBooks', JSON.stringify(this.savedBook));
  }

  display({ title, author, id }) {
    const li = document.createElement('li');
    const isbn = document.createElement('p');
    const titleP = document.createElement('p');
    const authorP = document.createElement('p');
    const button = document.createElement('button');
    isbn.innerHTML = id;
    isbn.className = 'isbn';
    titleP.innerHTML = `"${title}"  by`;
    authorP.innerHTML = author;
    button.innerHTML = 'Remove';
    button.className = 'remove';
    button.addEventListener('click', (event) => {
      this.removeBook(event.target.parentNode.firstChild.innerHTML);
    });

    li.appendChild(isbn);
    li.appendChild(titleP);
    li.appendChild(authorP);
    li.appendChild(button);
    this.bookList.appendChild(li);
  }

  displayBooks() {
    this.bookList.innerHTML = '';
    this.savedBook.forEach((book) => {
      this.display(book);
    });
  }
}

const ui = new UI();

document.getElementById('form-title').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');

  const book = new Book(title.value, author.value, ui.addId());
  ui.storeBooks(book);
  ui.displayBooks();

  localStorage.setItem('savedBooks', JSON.stringify(ui.returnStoreBook()));
  title.value = '';
  author.value = '';
});

function hideOrDisplay(target) {
  const addBook = document.getElementById('add-book');
  const allBook = document.getElementById('all-books');
  const contactBook = document.getElementById('contact');
  switch (target) {
    case 'List':
      allBook.style.display = 'block';
      addBook.style.display = 'none';
      contactBook.style.display = 'none';
      break;
    case 'Add new':
      allBook.style.display = 'none';
      addBook.style.display = 'block';
      contactBook.style.display = 'none';
      break;
    case 'Contact':
      allBook.style.display = 'none';
      addBook.style.display = 'none';
      contactBook.style.display = 'block';
      break;
    case 'Awesome Boooks':
      allBook.style.display = 'block';
      addBook.style.display = 'none';
      contactBook.style.display = 'none';
      break;
    default:
      addBook.style.display = 'none';
      contactBook.style.display = 'none';
  }
}

const link = document.querySelectorAll('.nav-link');

link.forEach((el) => el.addEventListener('click', (event) => {
  hideOrDisplay(event.target.innerHTML);
}));

const date = luxon.DateTime.now().toFormat('FF');
document.getElementsByClassName('date')[0].innerHTML = date;
