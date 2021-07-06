let books = [];
let counter = 0;
const bookList = document.getElementById('bookList');
const savedBooks = localStorage.getItem('savedBooks');

function display({ title, author, id }) {
  const li = document.createElement('li');
  const titleP = document.createElement('p');
  const authorP = document.createElement('p');
  const button = document.createElement('button');

  titleP.innerHTML = title;
  authorP.innerHTML = author;
  button.innerHTML = 'remove';
  button.className = 'remove';
  button.addEventListener('click', () => {
    books = books.filter((obj) => obj.id !== id);
    bookList.innerHTML = '';
    books.forEach((book) => {
      // eslint-disable-next-line no-use-before-define
      showBooks(book);
    });
    localStorage.setItem('savedBooks', JSON.stringify(books));
  });

  li.appendChild(titleP);
  li.appendChild(authorP);
  li.appendChild(button);
  bookList.appendChild(li);
}

function showBooks() {
  bookList.innerHTML = '';
  books.forEach((book) => {
    display(book);
  });
}

if (savedBooks) {
  books = JSON.parse(savedBooks);
  showBooks();
}

document.getElementById('form-title').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  books.push({ title: title.value, author: author.value, id: counter += 1 });
  showBooks();
  localStorage.setItem('savedBooks', JSON.stringify(books));
  title.value = '';
  author.value = '';
});
