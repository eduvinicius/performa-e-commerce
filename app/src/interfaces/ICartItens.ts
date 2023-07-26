export interface ICartItens {
    id: number,
    image: string,
    name: string,
    price: number,
    qty: number,
    size: string,
    color: string,
    totalPrice: number
    otherUnits: IOtherUnits[]
}

export interface IOtherUnits {
    color: string,
    size: string,
}