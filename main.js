let books = []

function addBook(event){
    event.preventDefault()
    
    let title = event.target['title'].value
    let author = event.target['author'].value

    books.push({title: title, author: author})
    
    showBooks()
    
    localStorage.setItem('savedBooks', JSON.stringify(books))

}


console.log(books);