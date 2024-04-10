// import { createContext } from "react";

// function noop() {}; 

// export const AuthContext = createContext({
//     token:null,
//     user:null,
//     login:noop(),
//     logout:noop(),
//     isAuthenticated:false,
// })

import { createContext } from "react";
import User from "../Models/User";
import Basket from "../Models/Basket";
import ProductInBasket from "../Models/ProductInBasket";


interface AuthContextType {
    token: string | null;
    user: User | null; 
    basket:Basket | null,
    ProductInBasket:ProductInBasket[] | null,
    isLocalCartEmpty:() => boolean;
    changeCount: (operation:string, productId:string) => void;
    addProductInCart: (product:ProductInBasket) => void;
    setUserBasketFromLocal:() => void;
    setUserBasketFromBase: (basket:Basket) => void;
    login: (jwtToken: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

function noop() {}

const defaultAuthContext: AuthContextType = {
    token: null,
    user: null,
    basket:null,
    ProductInBasket:null,
    isLocalCartEmpty: () => true,
    changeCount: noop,
    addProductInCart: noop,
    setUserBasketFromLocal: noop,
    setUserBasketFromBase: noop,
    login: noop,
    logout: noop,
    isAuthenticated: false,
};

export const AuthContext = createContext(defaultAuthContext);