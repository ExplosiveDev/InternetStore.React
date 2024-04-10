import React, { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Basket from "../Models/Basket";
import { getBasket } from "../services/baskets";
import DisplayProductsInBasket from "../components/DisplayProductInBasket";

const Cart: FC = () => {
    const auth = useContext(AuthContext);

    useEffect(() => {
        async function fetchData() {
            if (auth.isAuthenticated && auth.user && auth.token) {

                if(auth.isLocalCartEmpty()){
                    const BasketData: Basket = await getBasket(auth.user.id, auth.token);
                    auth.setUserBasketFromBase(BasketData);
                }
                else{
                    auth.setUserBasketFromLocal();
                }
            }
        }
        fetchData();
    }, [auth.isAuthenticated]);

    return (
        <>
            {
                auth.isAuthenticated ? (
                    <div className="d-flex justify-content-center">
                        {auth.ProductInBasket != null && auth.ProductInBasket.length > 0
                            ? (
                                <DisplayProductsInBasket productsArray={auth.ProductInBasket}></DisplayProductsInBasket>
                            )
                            : (
                                <h1>Cart is empty</h1>
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
