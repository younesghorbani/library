function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

function Book(title, authors, pages, read) {
    this.title = title;
    this.authors = authors;
    this.pages = pages;
    this.read = read;
}

let library = [];
function addBook(event) {
    event.preventDefault();

    const title = document.querySelector('#book-title').value;
    const authors = document.querySelector('#book-authors').value;
    const pages = document.querySelector('#book-pages').value;
    const read = Boolean(document.querySelector('#book-read').checked);
    
    const book = new Book(title, authors, pages, read);
    library.push(book);
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