import Basket from "./Basket";
import Product from "./Product";

interface ProductInBasket{
    id:string,
    product:Product,
    productId:string,
    count:number,
    basket:Basket,
    basketId:string
}

export default ProductInBasket;