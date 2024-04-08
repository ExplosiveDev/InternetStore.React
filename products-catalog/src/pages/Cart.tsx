import React, { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Basket from "../Models/Basket";
import { getBasket } from "../services/baskets";
import DisplayProductsInBasket from "../components/DisplayProductInBasket";

const Cart: FC = () => {
    const auth = useContext(AuthContext);
    const [basket, setBasket] = useState<Basket>();

    useEffect(() => {
        async function fetchData() {
            if (auth.isAuthenticated && auth.user && auth.token) {
                console.log(auth.user)
                const BasketData: Basket = await getBasket(auth.user.id, auth.token);
                setBasket(BasketData);
            }
        }

        fetchData();
    }, [auth]);

    return (
        <>
            {
                auth.isAuthenticated ? (
                    <div className="d-flex justify-content-center">
                        {basket?.products != null
                            ? (
                                <DisplayProductsInBasket productsArray={basket?.products}></DisplayProductsInBasket>
                            )
                            : (
                                <h1>Products is empty</h1>
                            )
                        }
                    </div>
                ) : (
                    <div className="d-flex justify-content-center">
                        <h3>You are not Authenticated </h3>
                    </div>
                )
            }
        </>
    );
}

export default Cart;
