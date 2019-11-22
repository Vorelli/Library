let myLibrary = [];
let body = document.querySelector('body');
let bookList = body.querySelector('#bookList');
let titleBar = body.querySelector('#titleBar');
let template = document.querySelector('.bookListItem');
template.parentElement.removeChild(template);
let menu = document.querySelector('#menu');
let addBook = document.querySelector('#addBook');
let addButton = document.querySelector('#add').firstElementChild;

function Book(title, author, numPages, notes, read, cover) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.notes = notes;
    this.read = read;
    this.cover = cover;
}

function addBookToLibrary(title, author, numPages, notes, read, cover) {
    myLibrary.push(new Book(title,author, numPages, notes, read, cover));
}

function render() {
    bookList.innerHTML = '';
    for(let index in myLibrary) {
        bookList.appendChild(setUpTemplate(myLibrary[index], template, index==myLibrary.length-1))
        bookList.childNodes[index].querySelector('.bookIcon').style.marginTop = (100-bookList.childNodes[index].querySelector('.bookIcon').scrollHeight)/2 + 'px';
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
    temp.querySelector('.bookIcon').style.content = book.cover != '' ? `URL(${book.cover})` : '';
    let tempTitle = book.title.indexOf(' ') != -1 ? book.title.replace(' ','+') : book.title;
    temp.querySelector('#amazonLink').parentElement.href = 'https://www.amazon.com/s?k=' + tempTitle + '+' + book.author.replace(' ', '+');
    temp.querySelector('.editPencil img').book = book;
    temp.querySelector('.editPencil').addEventListener('click', toggleAdd)
    temp.style.border = '5px solid goldenrod';
    temp.style.borderBottom = '0';
    if(bottomBorder)
        temp.style.borderBottom ='5px solid goldenrod';
    
    return temp;
}

function centerList() {
    let width = bookList.hasChildNodes() ? bookList.firstElementChild.clientWidth : 590;
    bookList.style.marginLeft = (window.innerWidth-width)/2 + 'px';
    titleBar.style.width = width + 'px';
    titleBar.style.marginLeft = (window.innerWidth-titleBar.clientWidth)/2 + 'px';
    menu.style.width = width + 'px';
    menu.style.marginLeft = (window.innerWidth-menu.clientWidth)/2 + 'px';
    addBook.style.width = width + 'px';
    addBook.style.marginLeft = (window.innerWidth-addBook.clientWidth)/2 + 'px';
}

let menuOpen = (menu) => {
    let srcSplit = body.querySelector(menu).firstElementChild.firstElementChild.src.split('/');
    return srcSplit[srcSplit.length-1]=='menuClose.png'
}

function toggleMenu() {
    let containsHash = this.href[this.href.length-1]=='#';
    if(containsHash && menuOpen(`#add`)) addButton.click();
    this.firstElementChild.src = containsHash ? 'menuClose.png' : this.firstElementChild.src='menuOpen.png';
    this.href = containsHash ? '#+' : '#';
    menu.style.backgroundColor = containsHash ? 'goldenrod' : 'transparent';
    menu.style.zIndex = containsHash ? 1 : 0;
    menu.style.top = containsHash ? '100px' : '-400px';
}

function toggleAdd(event) {
    body.querySelector('#addBook form input[name=\'submit\']').addEventListener('click', addBookForm);
    let containsHash = addButton.href[addButton.href.length-1]=='#';
    let x = menuOpen(`#hamburger`) && containsHash == true ? body.querySelector('#hamburger').firstElementChild.click() : false;
    addButton.firstElementChild.src = containsHash ? 'menuClose.png' : 'plus.png';
    addButton.href = containsHash ? '#+' : '#';
    addBook.style.backgroundColor = containsHash ? 'goldenrod' : 'transparent';
    addBook.style.zIndex = containsHash ? 1 : 0;
    addBook.style.top = containsHash ? '100px' : '-400px';
    let form = body.querySelector('#addBook form')
    let book = event.target.book;
    if(book) {
        //editing
        form.querySelector('input[name=\'title\']').value = book.title;
        form.querySelector('input[name=\'author\']').value = book.author;
        form.querySelector('input[name=\'pageNum\']').value = book.numPages;
        form.querySelector('input[name=\'notes\']').value = book.notes;
        form.querySelector('input[name=\'title\']').checked = book.read;
        form.querySelector('input[name=\'bookCover\']').value = book.cover;
        body.querySelector(`#addBook input[name='submit']`).book = book;
        form.querySelector(`input[name='remove']`).book = book;
        form.querySelector(`input[name='remove']`).addEventListener('click', removeBook);
        form.querySelector(`input[name='remove']`).style.visibility = 'visible'
    } else {
        form.querySelector('input[name=\'title\']').value = '';
        form.querySelector('input[name=\'author\']').value = '';
        form.querySelector('input[name=\'pageNum\']').value = '';
        form.querySelector('input[name=\'notes\']').value = '';
        form.querySelector('input[name=\'bookCover\']').value = '';
        form.querySelector('input[name=\'title\']').checked = false;
        form.querySelector(`input[name='remove']`).style.visibility = 'hidden';
        body.querySelector(`#addBook input[name='submit']`).book = undefined;
    }
}

function removeBook(event) {
    myLibrary.splice(myLibrary.indexOf(event.target.book), 1);
    addButton.click();
    render();
}

function getFrom(form, name) {
    return form.querySelector('input[name=\'' + name + '\']').type == 'text' ? form.querySelector('input[name=\'' + name + '\']').value : form.querySelector('input[name=\'' + name + '\']').checked;
}

function addBookForm(event) {
    let form = body.querySelector('#addBook form');
    let getOut = false;
    if(!/[A-z]{2,}/.test(getFrom(form,'title'))) {
        window.alert('You need to enter a title.');
        getOut=true;
    }
    else if(!/[A-z]{2,}/.test(getFrom(form,'author'))) {
        window.alert("You need to enter an author.");
        getOut=true;
    }
    else if(!/[0-9]+/.test(getFrom(form, 'pageNum'))) {
        window.alert("You need to enter a page count.");
        getOut=true;
    }
    else {
        let book = event.target.book;
        if(book){
            book.title = getFrom(form,'title');
            book.author = getFrom(form, 'author');
            book.numPages = getFrom(form, 'pageNum');
            book.notes = getFrom(form, 'notes');
            book.read = getFrom(form, 'read');
            book.cover = getFrom(form, 'bookCover');
        }            
        else
            addBookToLibrary(getFrom(form, 'title'), getFrom(form, 'author'), getFrom(form, 'pageNum'), getFrom(form, 'notes'), getFrom(form, 'read'), getFrom(form, 'bookCover'))
    }
    if(getOut) return;
    const inputs = document.querySelectorAll('#addBook input');
    for(index in inputs){
        if(inputs[index].type=='text')
            inputs[index].value = '';
        else
            inputs[index].checked = false;
    }
    addButton.click();
    render();
}

window.onresize = centerList;
body.querySelector('#hamburger').firstElementChild.addEventListener('click', toggleMenu);
addButton.addEventListener('click', toggleAdd);
render();