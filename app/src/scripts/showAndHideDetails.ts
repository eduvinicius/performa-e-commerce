const showDetailsBtn: HTMLElement = document.querySelector('.main-shirt-information-details-btn-show');
const hiddenDetailsBtn: HTMLElement = document.querySelector('.main-shirt-information-details-btn-hidden');
const descContainer: HTMLElement = document.querySelector('.main-shirt-information-details-desc');

showDetailsBtn.addEventListener('click', (): void => {
    descContainer.classList.remove('hidden');
    showDetailsBtn.classList.add('hidden');
    hiddenDetailsBtn.classList.remove('hidden');
});

hiddenDetailsBtn.addEventListener('click', (): void => {
    descContainer.classList.add('hidden');
    hiddenDetailsBtn.classList.add('hidden');
    showDetailsBtn.classList.remove('hidden')
});