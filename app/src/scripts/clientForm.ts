const clientForm: HTMLFormElement = document.querySelector('.client-doubts-form');

clientForm.addEventListener('submit', (e: SubmitEvent): void => {
    e.preventDefault();
    let clientDoubtInput: string = (document.querySelector('.client-doubts-input') as HTMLInputElement).value;
    let clientDoubt: HTMLElement = document.querySelector('.client-rating');

    clientDoubt.textContent = clientDoubtInput;
    clientForm.reset();
})