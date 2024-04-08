import { FC } from "react";
import ProductInBasket from "../Models/ProductInBasket"
import SingleProductInBasket from "./helpers/SingleProductInBasket";

interface DisplayProdcutsInBasketProps {
    productsArray: ProductInBasket[];
}

const DisplayProductsInBasket: FC<DisplayProdcutsInBasketProps> = ({ productsArray }) => {
    return(
        <div className="row g-2 d-flex justify-content-center border rounded-3 border-3 w-75 p-2">      
            {productsArray.map((product) => {
                return <SingleProductInBasket key={product.id} product={product} />
            })}
        </div>
    )
}

export default DisplayProductsInBasket;