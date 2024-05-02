import ProductInBasket from "./ProductInBasket";

interface Basket{
    id:string,
    userId:string,
    products:ProductInBasket[],
    totalPrice:number,
}

export default Basket;