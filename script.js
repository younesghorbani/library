function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

let library = [];

function displayBooks() {
    const books = document.querySelector('.books');

    library.forEach(book => {
        const divBook = document.createElement('div');
        divBook.classList.add('book');
    
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

        divBook.append(divInfo);
    
        const divAction = document.createElement('div');
        divAction.classList.add('action-btns');
    
        const btnRead = document.createElement('button');
        btnRead.className = 'btn read';
        btnRead.textContent = 'Read';

        divAction.append(btnRead);
    
        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn delete';
        btnDelete.textContent = 'Delete';

        divAction.append(btnDelete);

        divBook.append(divAction);
    
        books.append(divBook);
    });
}

function Book(title, authors, pages, read) {
    this.title = title;
    this.authors = authors;
    this.pages = pages;
    this.read = read;
}

function addBook(event) {
    event.preventDefault();

    const title = document.querySelector('#book-title').value;
    const authors = document.querySelector('#book-authors').value;
    const pages = document.querySelector('#book-pages').value;
    const read = Boolean(document.querySelector('#book-read').checked);
    
    const book = new Book(title, authors, pages, read);
    library.push(book);

    displayBooks();
}

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const newBtn = document.querySelector('.new');
const closeBtn = document.querySelector('.close');
const addBtn = document.querySelector('.add');

newBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
});
addBtn.addEventListener('click', addBook);