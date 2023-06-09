function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const newBtn = document.querySelector('.new');
const closeBtn = document.querySelector('.close');

newBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
});