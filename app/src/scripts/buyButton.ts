import { dealWithItens } from "./sideNavDrawer.js";
import { addItemToCart } from "./cart.js";

let bagQuantity: number = parseInt(localStorage.getItem('bagQuantity') || '0') || 0;

let itemQTY: HTMLElement = document.querySelector('.nav-header-search-quantity');
let sideNavQty: HTMLElement = document.querySelector('.side-nav-top-bag-qty');
const buyButtonElement: HTMLElement = document.querySelector('.main-shirt-information-buyButton');
const sizeShirtBtn: NodeListOf<HTMLElement> = document.querySelectorAll('.shirt-size-btn');
const shirtColor: NodeListOf<HTMLElement> = document.querySelectorAll('.shirt-color');

let isSizeSelected: boolean = false;
let size: string = '';

let isColorSelected: boolean = false;
let color: string = '';

const changeSize = (event: Event): void => {
    sizeShirtBtn.forEach((btn: HTMLElement) => {
        btn.classList.remove('shirt-size-btn-selected')
    })
    const target = event.target as HTMLElement;
    target.classList.add('shirt-size-btn-selected');
    isSizeSelected = true;
    size = target.textContent;
}

sizeShirtBtn.forEach((btn: HTMLElement): void => {
    btn.addEventListener('click', changeSize)
})

const changeColor = (event: Event): void => {
    shirtColor.forEach((color: HTMLElement) => {
        color.classList.remove('main-shirt-information-color-selected')
    })
    const target = event.target as HTMLElement;
    target.classList.add('main-shirt-information-color-selected');
    isColorSelected = true;
    color = target.getAttribute('data-color');
}

shirtColor.forEach(color => {
    color.addEventListener('click', changeColor)
})

const buyButton = () => {
    itemQTY.textContent = bagQuantity.toString()
    sideNavQty.textContent = bagQuantity.toString()

    buyButtonElement.addEventListener('click', (): void => {
        if ( isSizeSelected && isColorSelected ) {
            addItemToCart(size, color);    
            localStorage.setItem('hasItens', 'true');
            dealWithItens(true);
            incrementBagQty();
            itemQTY.classList.remove('nav-header-search-quantity-none');
            sideNavQty.classList.remove('hidden');
        } else {
            alert('Escolha um tamanho e uma cor');
        }
    })
};

export const incrementBagQty = (): void => {
    let bagQuantityPlus: number = bagQuantity += 1;
    localStorage.setItem('bagQuantity', bagQuantityPlus.toString());
    itemQTY.textContent = bagQuantity.toString();
    sideNavQty.textContent = bagQuantity.toString();
}

export const decrementBagQty = (qty: number): void => {
    let bagQuantityMinus: number = bagQuantity -= qty;
    localStorage.setItem('bagQuantity', bagQuantityMinus.toString());
    itemQTY.textContent = bagQuantity.toString();
    sideNavQty.textContent = bagQuantity.toString();
}

buyButton();

