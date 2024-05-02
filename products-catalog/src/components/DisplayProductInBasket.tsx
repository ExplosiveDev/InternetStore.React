import { FC, useContext } from "react";
import ProductInBasket from "../Models/ProductInBasket"
import SingleProductInBasket from "./helpers/SingleProductInBasket";
import { MouseEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import ConfirmCartResponse from "./Contracts/ConfirmCartResponse";
import {confirmCart} from "../services/baskets"


interface DisplayProdcutsInBasketProps {
    productsArray: ProductInBasket[];
    totalPrice: number;
}

const DisplayProductsInBasket: FC<DisplayProdcutsInBasketProps> = ({ productsArray, totalPrice }) => {
    const auth = useContext(AuthContext);

    const formatter = new Intl.NumberFormat('default', {
        style: 'currency',
        currency: 'UAH',
    });

    const SubmitCart = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (!auth.isLocalCartEmpty() && auth.ProductInBasket != null && auth.user && auth.token) {
            const data: ConfirmCartResponse[] = auth.ProductInBasket.map(item => {
                return {
                    productInBasketId: item.id,
                    count: item.count,
                };
            });
            const statusCode = await confirmCart(auth.user?.id, auth.token, data);
            if(statusCode == 200){
                auth.clearCart();
            }
        }

    }

    return (
        <div className="row g-2 d-flex justify-content-center border rounded-3 border-3 w-75 p-2">
            {productsArray.map((product) => {
                return <SingleProductInBasket key={product.id} product={product} />
            })}
            <h1 className="text-center">{formatter.format(totalPrice)}</h1>
            <button className="btn btn-success w-50" name="CountMinus" onClick={SubmitCart}>Підтвердити</button>

        </div>
    )
}

export default DisplayProductsInBasket;