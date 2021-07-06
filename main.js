let books = []
let counter = 0
const bookList = document.getElementById('bookList');
let savedBooks = localStorage.getItem('savedBooks')


function addBook(event){
    event.preventDefault()
    
    let title = document.getElementById('title')
    let author = document.getElementById('author')
    
    books.push({title: title.value, author: author.value, id: counter+=1})
    
    showBooks()
    localStorage.setItem('savedBooks', JSON.stringify(books))
    title.value = ''
    author.value = ''
}

if(savedBooks){
    books = JSON.parse(savedBooks)
    showBooks()
}


function showBooks(){
    bookList.innerHTML = ''
    books.forEach((book) => {
        display( book )
    })
}

function display({title, author, id }){

    let li = document.createElement('li')
    let titleP = document.createElement('p')
    let authorP = document.createElement('p')
    let button = document.createElement('button')

    titleP.innerHTML = title
    authorP.innerHTML = author
    button.innerHTML = 'remove'
    button.className = 'remove'
    button.addEventListener('click', function(){
        books = books.filter((obj) => obj.id !== id)
        bookList.innerHTML = ''
        books.forEach((book) => {
            showBooks(book)
        })
        localStorage.setItem('savedBooks', JSON.stringify(books))
    })

    li.appendChild(titleP)
    li.appendChild(authorP)
    li.appendChild(button)
    bookList.appendChild(li)
}