// eslint-disable-next-line max-classes-per-file
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UI {
  constructor() {
    this.savedBook = [];
    this.bookList = document.getElementById('bookList');
    this.parseBook();
  }

  returnStoreBook() {
    return this.savedBook;
  }

  parseBook() {
    if (this.savedBook) {
      this.savedBook = JSON.parse(localStorage.getItem('savedBooks'));
      this.displayBooks();
    }
  }

  storeBooks(book) {
    this.savedBook.push(book);
    localStorage.setItem('savedBooks', JSON.stringify(this.savedBook));
  }

  removeBook(book) {
    this.savedBook = this.savedBook.filter((obj) => obj.title !== book);
    this.bookList.innerHTML = '';
    this.savedBook.forEach((book) => {
      // eslint-disable-next-line no-use-before-define
      this.displayBooks(book);
    });
    localStorage.setItem('savedBooks', JSON.stringify(this.savedBook));
  }

  display({ title, author }) {
    const li = document.createElement('li');
    const titleP = document.createElement('p');
    const authorP = document.createElement('p');
    const button = document.createElement('button');

    titleP.innerHTML = title;
    authorP.innerHTML = author;
    button.innerHTML = 'remove';
    button.className = 'remove';
    button.addEventListener('click', (event) => {
      this.removeBook(event.target.parentNode.firstChild.innerHTML);
    });

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

  const book = new Book(title.value, author.value);
  ui.storeBooks(book);
  ui.displayBooks();

  localStorage.setItem('savedBooks', JSON.stringify(ui.returnStoreBook()));
  title.value = '';
  author.value = '';
});
