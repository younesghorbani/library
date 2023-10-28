let library = [];

const total = document.querySelector('.total > p');
const newBtn = document.querySelector('.new');
const addBtn = document.querySelector('.add');
const closeBtn = document.querySelector('.close');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const inputs = document.querySelectorAll(`input[type='text']`);
const error = document.querySelector('.error');

newBtn.addEventListener('click', openModal);
addBtn.addEventListener('click', addBook);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
});
document.addEventListener('click', doActions);
inputs.forEach(input => input.addEventListener('input', () => {
    if (error.textContent) hideError();
}));

/*
    When the page loads, if the library exists in Local Storage, 
    its content will be retrieved.
*/
(() => {
    if (localStorage.library) {
        library = JSON.parse(localStorage.getItem('library'));

        displayBooks();
    }

    total.textContent = library.length;
})();

function openModal() {
    document.querySelector('form').reset();

    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
    if (error.textContent) hideError();

    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

function displayError() {
    error.textContent = 'All fields must be filled!';
}

function hideError() {
    error.textContent = '';
}

function displayBooks() {
    const books = document.querySelector('.books');
    books.replaceChildren();

    library.forEach((book, index) => {    
        const divInfo = document.createElement('div');
        divInfo.classList.add('info');
    
        const divStatus = document.createElement('div');
        divStatus.classList.add('status');
        divStatus.textContent = (book.read === true ? 'read' : 'unread');
    
        const divDetails = document.createElement('div');
        divDetails.classList.add('details');
    
        const pTitle = document.createElement('p');
        pTitle.classList.add('title');
        pTitle.textContent = book.title;
    
        const divMore = document.createElement('div');
        divMore.classList.add('more');
    
        const spanAuthors = document.createElement('span');
        spanAuthors.classList.add('authors');
        spanAuthors.textContent = book.authors + ', ';
    
        const spanPages = document.createElement('span');
        spanPages.classList.add('pages');
        spanPages.textContent = book.pages + ' pages';
    
        divMore.append(spanAuthors);
        divMore.append(spanPages);
    
        divDetails.append(pTitle);
        divDetails.append(divMore);
    
        divInfo.append(divStatus);
        divInfo.append(divDetails);
    
        const divAction = document.createElement('div');
        divAction.classList.add('action-btns');
    
        const btnRead = document.createElement('button');
        btnRead.className = 'btn read';
        btnRead.textContent = 'Read';
    
        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn delete';
        btnDelete.textContent = 'Delete';

        divAction.append(btnRead);
        divAction.append(btnDelete);

        const divBook = document.createElement('div');
        divBook.classList.add('book');
        divBook.dataset.id = index;
        divBook.append(divInfo);
        divBook.append(divAction);

        books.append(divBook);
    });
}

function doActions(event) {
    if (event.target.className === 'btn read') {
        const index = event.target.parentElement.parentElement.getAttribute('data-id');
        const book = document.querySelector(`div[data-id='${index}']`);
        
        const status = book.firstElementChild.firstElementChild;
        if (library[index].read === true) {
            library[index].read = false;
            localStorage.setItem('library', JSON.stringify(library));
            status.textContent = 'Unread';
        } else {
            library[index].read = true;
            localStorage.setItem('library', JSON.stringify(library));
            status.textContent = 'Read';
        }
    }

    if (event.target.className === 'btn delete') {
        const index = event.target.parentElement.parentElement.getAttribute('data-id');
        
        library.splice(index, 1);
        
        if (library.length !== 0) {
            localStorage.setItem('library', JSON.stringify(library));
        } else {
            localStorage.clear();
        }

        total.textContent = library.length;

        displayBooks();
    }
}

class Book {
    constructor(title, authors, pages, read) {
        this.title = title;
        this.authors = authors;
        this.pages = pages;
        this.read = read;
    }
}

function addBook(event) {
    event.preventDefault();

    const title = document.querySelector('#book-title');
    const authors = document.querySelector('#book-authors');
    const pages = document.querySelector('#book-pages');
    const read = document.querySelector('#book-read');

    if (
        title.validity.valueMissing || 
        authors.validity.valueMissing || 
        pages.validity.valueMissing
    ) {
        displayError();
    } else {
        const titleValue = title.value;
        const authorsValue = authors.value;
        const pagesValue = pages.value;
        const readValue = Boolean(read.checked);

        const book = new Book(titleValue, authorsValue, pagesValue, readValue);
        library.push(book);
    
        localStorage.setItem('library', JSON.stringify(library));
    
        total.textContent = library.length;
    
        displayBooks();

        document.querySelector('form').reset();
    }
}