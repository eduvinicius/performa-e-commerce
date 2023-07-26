import { ICartItens, IOtherUnits } from "../interfaces/ICartItens.js";
import { decrementBagQty, incrementBagQty } from "./buyButton.js";
import { dealWithItens } from "./sideNavDrawer.js";

const mainShirtTitle: HTMLElement = document.querySelector('.main-shirt-information-title');
const mainShirtImg: HTMLImageElement = document.querySelector('.main-shirt-img');
const mainShirtID: HTMLElement = document.querySelector('.main-shirt-information-ref-span');
const mainShirtOldPrice: HTMLElement = document.querySelector('.main-shirt-information-span1');
const mainShirtActualPrice: HTMLElement = document.querySelector('.main-shirt-information-span2');
const sideNavItensList: HTMLElement = document.querySelector('.side-nav-itens-list');
const totalPrice: HTMLElement = document.querySelector('.side-nav-itens-info-subtotal-price-span');

export let items: ICartItens[] = JSON.parse(localStorage.getItem('list-items')) || [];
export let totalPriceStorage: number = parseFloat(localStorage.getItem('totalPrice') || '0') || 0;

export const bagQtyElement = (items: number): void => {
  let itemQTY: HTMLElement = document.querySelector('.nav-header-search-quantity');
  let sideNavQty: HTMLElement = document.querySelector('.side-nav-top-bag-qty');

  if ( items > 0 ) {
    itemQTY.classList.remove('nav-header-search-quantity-none');
    sideNavQty.classList.remove('hidden');
  }
}

bagQtyElement(items.length);

const changeCartUI = (): void => {

    if (items.length === 0) {
        dealWithItens(false)
    }
}

export const itemsExistsInCart = (itemID: number): boolean => {
    return items.some(item => item.id === itemID)
}

export const addItemToCart = (size: string, color: string): void => {
    let itemID: number = parseInt(mainShirtID.textContent);

    let otherUnits: IOtherUnits = {
      color: color,
      size: size
    }

    if ( itemsExistsInCart(itemID) ) {
      items = items.map(item => {
        if ( item.id === itemID ) {
            item.qty += 1;
            let price: number = Number(mainShirtActualPrice.textContent.replace(',', '.'))
            let totalPrice: number = price * item.qty;
            item.totalPrice =  +totalPrice.toFixed(2);
            item.otherUnits.push(otherUnits);
        }
        createCartElement();
        return item;
        });
    } else {
        let newItem: ICartItens = {
            id: itemID,
            image: mainShirtImg.src,
            name: mainShirtTitle.textContent,
            size: size,
            color: color,
            qty: 1, 
            price: Number(mainShirtActualPrice.textContent.replace(',', '.')),
            totalPrice: Number(mainShirtActualPrice.textContent.replace(',', '.')),
            otherUnits: []
        };            
        items.push(newItem);
        createCartElement();
    }
    localStorage.setItem('list-items', JSON.stringify(items));
};

const totalPriceCart = (): void => {
    let price: number = 0;

    items.forEach(( item: ICartItens ) => {
        price += item.totalPrice
    })

    totalPrice.textContent = price.toFixed(2).replace('.', ',')
    localStorage.setItem('totalPrice', price.toString())
}

const createCartElement = (): void => {
    sideNavItensList.innerHTML = '';
  
    items.forEach(( item: ICartItens ) => {
      const listItem: HTMLElement = document.createElement('li');
      listItem.classList.add('side-nav-itens-list-item');
      listItem.setAttribute('data-item-id', item.id.toString());
  
      const image: HTMLImageElement = document.createElement('img');
      image.classList.add('side-nav-itens-list-item-img');
      image.src = item.image;
  
      const informationContainer: HTMLDivElement = document.createElement('div');
      informationContainer.classList.add('side-nav-itens-list-item-container');
  
      const title: HTMLHeadingElement = document.createElement('h4');
      title.textContent = item.name;
      title.classList.add('side-nav-itens-list-item-title');
  
      const priceWrapper: HTMLParagraphElement = document.createElement('p');
      priceWrapper.classList.add('side-nav-itens-list-item-container-price');
  
      const oldPrice: HTMLSpanElement = document.createElement('span');
      oldPrice.classList.add('side-nav-itens-list-item-oldprice');
      oldPrice.textContent = mainShirtOldPrice.textContent;
  
      const actualPrice: HTMLSpanElement = document.createElement('span');
      actualPrice.classList.add('side-nav-itens-list-item-actualprice');
      let actualPriceFormated: number = item.price;
      actualPrice.textContent = ` R$ ${actualPriceFormated.toFixed(2).replace('.', ',')}`;

      const qtyContainer: HTMLDivElement = document.createElement('div');
      qtyContainer.classList.add('side-nav-itens-list-item-qtyContainer');

      const lessIcon: HTMLImageElement = document.createElement('img');
      lessIcon.src = './icons/icon-less.png';
      lessIcon.classList.add('side-nav-itens-list-item-container-less-icon');
  
      const qtyInput: HTMLInputElement = document.createElement('input');
      qtyInput.classList.add('side-nav-itens-list-item-container-input');
      qtyInput.value = item.qty.toString();
  
      const plusIcon: HTMLImageElement = document.createElement('img');
      plusIcon.src = './icons/icon-soma.png';
      plusIcon.classList.add('side-nav-itens-list-item-container-plus-icon')
  
      const trashIcon: HTMLImageElement = document.createElement('img');
      trashIcon.classList.add('side-nav-itens-list-item-container-trash');
      trashIcon.src = './icons/trash-alt.png';
  
      informationContainer.appendChild(title);
      informationContainer.appendChild(priceWrapper);
      priceWrapper.appendChild(oldPrice);
      priceWrapper.appendChild(actualPrice);
      qtyContainer.appendChild(lessIcon);
      qtyContainer.appendChild(qtyInput);
      qtyContainer.appendChild(plusIcon);
      informationContainer.appendChild(qtyContainer);
      
      listItem.appendChild(image);
      listItem.appendChild(informationContainer);
      listItem.appendChild(trashIcon);
  
      sideNavItensList.appendChild(listItem);

      plusIcon.addEventListener('click', (): void => {
        incrementItemQty(item);
        createCartElement();
      })

      lessIcon.addEventListener('click', (): void => {
        decrementItemQty(item);
        createCartElement();
      })

      trashIcon.addEventListener('click', (): void => {
        deleteItem(item.id);
        decrementBagQty(item.qty);
      })
    });
    totalPriceCart();
    changeCartUI();
  };

  createCartElement();

const deleteItem = (itemID: number): void => {
    let newItems: ICartItens[] = items.filter(( item: ICartItens ) => item.id !== itemID)
    localStorage.setItem('list-items', JSON.stringify(newItems));
    items = newItems;
    let listItem = document.querySelector(`li[data-item-id="${itemID}"]`);
    if (listItem) {
      listItem.parentNode.removeChild(listItem);
        createCartElement(); 
    }
}

const incrementItemQty = (item: ICartItens): void => {
  incrementBagQty();
  item.qty += 1;
  let price: number = item.price;
  let totalPrice: number = price * item.qty;
  item.totalPrice = +totalPrice.toFixed(2);
  localStorage.setItem('list-items', JSON.stringify(items));
};

const decrementItemQty = (item: ICartItens): void => {
  decrementBagQty(1);
  item.qty -= 1;
  let price: number = item.price;
  let totalPrice: number = price * item.qty;
  item.totalPrice =  +totalPrice.toFixed(2);
  localStorage.setItem('list-items', JSON.stringify(items));
  if ( !item.totalPrice ) {
      deleteItem(item.id);
    }
}

