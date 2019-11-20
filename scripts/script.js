let myLibrary = [];
let body = document.querySelector('body');
let bookList = body.querySelector('#bookList');
let titleBar = body.querySelector('#titleBar');
let template = document.querySelector('.bookListItem');
template.parentElement.removeChild(template);
let menu = document.querySelector('#menu');
let addBook = document.querySelector('#addBook');

function Book(title, author, numPages, notes, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.notes = notes;
    this.read = read;
}

Book.prototype.toString = function() {
    return this.title + ' by ' + this.author + ': ' + this.numPages + ' pages long. Read: ' + this.read;
}

function addBookToLibrary(title, author, numPages, notes, read) {
    myLibrary.push(new Book(title,author, numPages, notes, read));
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
    temp.querySelector('#desc').textContent = book.notes;
    temp.querySelector('#read').checked = book.read;
    temp.querySelector('#read').disabled = true;
    let tempTitle = book.title.indexOf(' ') != -1 ? book.title.replace(' ','+') : book.title;
    temp.querySelector('#amazonLink').parentElement.href = 'https://www.amazon.com/s?k=' + tempTitle + '+' + book.author.replace(' ', '+');


    temp.style.border = '5px solid goldenrod';
    temp.style.borderBottom = '0';
    if(bottomBorder)
        temp.style.borderBottom ='5px solid goldenrod';
    return temp;
}

addBookToLibrary('The Hobbit','J.R.R. Tolkien',128, 'A small boy goes on a journey.',true);
for(let i = 0; i<10; i++)
    addBookToLibrary('Harry Potter and the Sorcerer\'s Stone','J.K. Rowling',128, 'A boy learns that he is destined to be a wizard.',Math.floor(Math.random()*2) == 1 ? true : false);
render();

function centerList() {
    bookList.style.marginLeft = (window.innerWidth-bookList.firstElementChild.clientWidth)/2 + 'px';
    titleBar.style.width = bookList.firstElementChild.clientWidth + 'px';
    titleBar.style.marginLeft = (window.innerWidth-titleBar.clientWidth)/2 + 'px';
    menu.style.width = bookList.firstElementChild.clientWidth + 'px';
    menu.style.marginLeft = (window.innerWidth-menu.clientWidth)/2 + 'px';
    addBook.style.width = bookList.firstElementChild.clientWidth + 'px';
    addBook.style.marginLeft = (window.innerWidth-addBook.clientWidth)/2 + 'px';
}

let menuOpen = (menu) => {
    let srcSplit = body.querySelector(menu).firstElementChild.firstElementChild.src.split('/');
    return srcSplit[srcSplit.length-1]=='menuClose.png'
}

function toggleMenu() {
    let containsHash = this.href[this.href.length-1]=='#';
    if(containsHash && menuOpen(`#add`)) body.querySelector('#add').firstElementChild.click();
    this.firstElementChild.src = containsHash ? 'menuClose.png' : this.firstElementChild.src='menuOpen.png';
    this.href = containsHash ? '#+' : '#';
    menu.style.backgroundColor = containsHash ? 'goldenrod' : 'transparent';
    menu.style.zIndex = containsHash ? 1 : 0;
    menu.style.top = containsHash ? '100px' : '-400px';
}

function toggleAdd() {
    let containsHash = this.href[this.href.length-1]=='#';
    let x = menuOpen(`#hamburger`) && containsHash == true ? body.querySelector('#hamburger').firstElementChild.click() : false;
    this.firstElementChild.src = containsHash ? 'menuClose.png' : 'plus.png';
    this.href = containsHash ? '#+' : '#';
    addBook.style.backgroundColor = containsHash ? 'goldenrod' : 'transparent';
    addBook.style.zIndex = containsHash ? 1 : 0;
    addBook.style.top = containsHash ? '100px' : '-400px';
 
}

function getFrom(form, name) {
    return form.querySelector('input[name=\'' + name + '\']').type == 'text' ? form.querySelector('input[name=\'' + name + '\']').value : form.querySelector('input[name=\'' + name + '\']').checked;
}

function addBookForm(ech, edit) {
    if(!edit) {
        let form = body.querySelector('#addBook form')
        addBookToLibrary(getFrom(form, 'title'), getFrom(form, 'author'), getFrom(form, 'pageNum'), getFrom(form, 'notes'), getFrom(form, 'read'))
    }
    const inputs = document.querySelectorAll('#addBook input');
    for(index in inputs){
        if(inputs[index].type=='text')
            inputs[index].value = '';
        else
            inputs[index].checked = false;
    }
    body.querySelector('#add').firstElementChild.click();
    render();
}



window.onresize = centerList;
body.querySelector('#hamburger').firstElementChild.addEventListener('click', toggleMenu);
body.querySelector('#add').firstElementChild.addEventListener('click', toggleAdd);
body.querySelector('#addBook form input[type=\'submit\']').addEventListener('click', addBookForm, false)