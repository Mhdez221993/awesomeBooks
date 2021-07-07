let books = []
let counter = 0

function addBook(event){
    event.preventDefault()
    
    let title = event.target['title'].value
    let author = event.target['author'].value

    books.push({title: title.value, author: author.value, id: counter+=1})
    
    showBooks()
    
    localStorage.setItem('savedBooks', JSON.stringify(books))

}

function showBooks(){
        bookList.innerHTML = ''
        books.forEach((book) => {
            display( book )
        })
    }
 
}


console.log(books);