import { IDb } from "../interfaces/IDb.js";
import { db } from "../mockedData/db.js";

const suggestionListElement: HTMLElement = document.querySelector('.suggestion-itens-list');
const mainShirtImg: HTMLImageElement = document.querySelector('.main-shirt-img');
const mainShirtTitle: HTMLElement = document.querySelector('.main-shirt-information-title');
const mainShirtID: HTMLElement = document.querySelector('.main-shirt-information-ref-span');
const mainShirtOldPrice: HTMLElement = document.querySelector('.main-shirt-information-span1');
const mainShirtActualPrice: HTMLElement = document.querySelector('.main-shirt-information-span2');
const mainShirtInstallment: HTMLElement = document.querySelector('.main-shirt-information-installment');
const mainShirtSideList: NodeListOf<HTMLImageElement> = document.querySelectorAll('.main-shirt-container-shirts-list-item');

export const addItensSuggestionList = (): void => {

    db.forEach(( item: IDb ): void => {
        const listItem: HTMLLIElement = document.createElement('li');
        const image: HTMLImageElement = document.createElement('img');
        const title: HTMLHeadingElement = document.createElement('h4');
        const priceWrapper: HTMLParagraphElement = document.createElement("p");
        const oldPrice: HTMLSpanElement = document.createElement("span");
        const actualPrice: HTMLSpanElement = document.createElement("span");
        const installment: HTMLParagraphElement = document.createElement("p");

        let price: number = item.price;
        let discount: number = 0.3;
        let priceWithDiscount: number = price - (price * discount);
        let installmentItem: number = priceWithDiscount / 3;
        image.src = item.image;
        title.textContent = `${item.name.toUpperCase()} ${item.id}`;
        title.classList.add("suggestion-itens-list-title");

        oldPrice.textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
        oldPrice.classList.add("suggestion-itens-oldPrice");

        actualPrice.textContent = `R$ ${priceWithDiscount.toFixed(2).replace('.', ',')}`;
        actualPrice.classList.add("suggestion-itens-actualPrice");
        priceWrapper.appendChild(oldPrice);
        priceWrapper.appendChild(actualPrice);
        priceWrapper.classList.add("suggestion-itens-list-price");
        installment.textContent = `ou 3x R$ ${installmentItem.toFixed(2).replace('.', ',')}`;

        listItem.appendChild(image);
        listItem.appendChild(title);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(priceWrapper);
        listItem.appendChild(installment);
        suggestionListElement.appendChild(listItem);

       listItem.addEventListener('click', (): void => {
        mainShirtImg.src = item.image;
        mainShirtTitle.textContent = item.name.toUpperCase();
        mainShirtID.textContent = `${item.id}`;
        mainShirtOldPrice.textContent = `de R$ ${price.toFixed(2).replace('.', ',')}`;
        mainShirtActualPrice.textContent = priceWithDiscount.toFixed(2).replace('.', ',');
        mainShirtInstallment.textContent = `ou 3x R$ ${installmentItem.toFixed(2).replace('.', ',')}`;
        mainShirtSideList.forEach(( itemList: HTMLImageElement ) => {
            itemList.src = item.image
        })
       })
    })
}

addItensSuggestionList();