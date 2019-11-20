let myLibrary = [];
let body = document.querySelector('body');
let bookList = body.querySelector('#bookList');
let titleBar = body.querySelector('#titleBar');
let template = document.querySelector('.bookListItem');
template.parentElement.removeChild(template);

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

Book.prototype.toString = function() {
    return this.title + ' by ' + this.author + ': ' + this.numPages + ' pages long. Read: ' + this.read;
}

function addBookToLibrary(title, author, numPages, read) {
    myLibrary.push(new Book(title,author, numPages, read));
}

function render() {
    bookList.innerHTML = '';
    for(let index in myLibrary) {
        
        bookList.appendChild(setUpTemplate(myLibrary[index], template, index==myLibrary.length-1))
            
    }
    centerList();
}

function setUpTemplate(book, template, bottomBorder) {
    let temp = template.cloneNode(true);
    temp.querySelector('#title').textContent = book.title;
    temp.querySelector('#author').textContent = "by " + book.author;
    temp.querySelector('#read').checked = book.read;
    temp.querySelector('#read').disabled = true;
    temp.querySelector('#amazonLink').parentElement.href = 'https://www.amazon.com/s?k=' + book.title.replace(' ','+') + '+' + book.author.replace(' ', '+');


    temp.style.border = '5px solid goldenrod';
    temp.style.borderBottom = '0';
    if(bottomBorder)
        temp.style.borderBottom ='5px solid goldenrod';
    return temp;
}

addBookToLibrary('The Hobbit','J.R.R. Tolkien',128,false);
addBookToLibrary('Harry Potter and the Sorcerer\'s Stone','J.K. Rowling',128,true);
addBookToLibrary('Harry Potter and the Sorcerer\'s Stone','J.K. Rowling',128,true);
addBookToLibrary('Harry Potter and the Sorcerer\'s Stone','J.K. Rowling',128,true);
addBookToLibrary('Harry Potter and the Sorcerer\'s Stone','J.K. Rowling',128,true);
addBookToLibrary('Harry Potter and the Sorcerer\'s Stone','J.K. Rowling',128,true);
addBookToLibrary('Harry Potter and the Sorcerer\'s Stone','J.K. Rowling',128,true);
addBookToLibrary('Harry Potter and the Sorcerer\'s Stone','J.K. Rowling',128,true);
addBookToLibrary('Harry Potter and the Sorcerer\'s Stone','J.K. Rowling',128,true);
render();

function centerList() {
    bookList.style.marginLeft = (window.innerWidth-bookList.firstElementChild.clientWidth)/2 + 'px';
    titleBar.style.width = bookList.firstElementChild.clientWidth + 'px';
    titleBar.style.marginLeft = (window.innerWidth-titleBar.clientWidth)/2 + 'px';
}



window.onresize = centerList;