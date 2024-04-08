import ProductInBasket from "./ProductInBasket";

interface Basket{
    id:string,
    userId:string,
    products:ProductInBasket[],
}

export default Basket;