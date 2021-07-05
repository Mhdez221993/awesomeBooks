let books = []

function addBook(event){
    event.preventDefault()
    
    let title = event.target['title'].value
    let author = event.target['author'].value

    let book = {title: title, author: author}
    
    books.push(book)

    display(books)
}

function display(books){
    let target = document.getElementById('target')

    for(let book of books){
        let title = document.createElement('p')
        let author = document.createElement('p')
        let button = document.createElement('button')
        
        title.innerHTML = book.title
        author.innerHTML = book.author
        button.innerHTML = 'remove'
        button.className = 'remove'

        target.appendChild(title)
        target.appendChild(author)
        target.appendChild(button)

    }

}


