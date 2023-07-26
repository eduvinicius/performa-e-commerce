import { checkCEP } from "./checkCEP.js";

const shipForm: HTMLFormElement = document.querySelector('.main-shirt-information-shipment-form');
const shipCalcElement: HTMLElement = document.querySelector('.main-shirt-information-shipment-calc-ship');

shipForm.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault();
    let cepData: string = (
        document.querySelector('.main-shirt-information-shipment-input') as HTMLInputElement
        ).value;
    let hasValidCEP: boolean = checkCEP(cepData);
    if ( hasValidCEP ) {
        shipmentCalc(shipCalcElement)
    } else {
        shipCalcElement.textContent = `Digite um cep válido`;
    }
    shipForm.reset();    
});

export const shipmentCalc = (shipCalcElement: HTMLElement): string => {
    let itemPrice: number = parseFloat(document.querySelector('.main-shirt-information-span2').textContent);
    let priceWithShipment: number = itemPrice + (itemPrice * 0.1);

    return shipCalcElement.textContent = `Preço do item com o frete: R$${priceWithShipment}`;
};

