import { useCallback, useState, useEffect, useId } from "react"
import {secureLocalStorage} from "./secureLocalStorage.hook"
import User from "../../Models/User";
import Basket from "../../Models/Basket";
import ProductInBasket from "../../Models/ProductInBasket";


const storageName = 'userData';
const storageCartName = 'userCart';

const initState:User = {
    id: '',
    userName: '',
    email: '',
    passwordHash: '',
    roles: [],
};

export const useAuth = () => {
    const [token, setToken] = useState<string | null>();
    const [user, setUser] = useState<User | null>();
    const [ProductInBasket, setProducts] = useState<ProductInBasket[] | null>();
    const {secretKey, saveEncryptedObject, getDecryptedObject} = secureLocalStorage()

    const changeCount = useCallback((operation: string, productId: string) => {
        const products = getDecryptedObject(storageCartName,secretKey) as ProductInBasket[];
        // const products = JSON.parse(localStorage.getItem(storageCartName)!) as ProductInBasket[];

        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {

            if (operation === "CountPlus") {
                products[productIndex].count++;
            } else if (operation === "CountMinus" && products[productIndex].count > 1) {
                products[productIndex].count--;
            }

            setProducts(products);
            saveEncryptedObject(storageCartName,products,secretKey);
            // localStorage.setItem(storageCartName, JSON.stringify(products));

        } else {
            console.log("Product not found in the basket.");
        }
    }, [])

    const deleteProduct = useCallback((prodId: string) => {
        const products = getDecryptedObject(storageCartName,secretKey) as ProductInBasket[];
        // const products = JSON.parse(localStorage.getItem(storageCartName)!) as ProductInBasket[];
        const index = products.findIndex((item) => item.id === prodId);
        if (index !== -1) {
            products.splice(index, 1);
            setProducts(products);
            saveEncryptedObject(storageCartName,products,secretKey);
            // localStorage.setItem(storageCartName, JSON.stringify(products));
        }
    }, [])

    const isLocalCartEmpty = useCallback((): boolean => {
        try {
            const data = getDecryptedObject(storageCartName, secretKey);
    
            if (Array.isArray(data) && data.length === 0) {
                return true;
            }
    
            if (data === null || data === undefined) {
                return true;
            }
    
            return false; 
    
        } catch (error) {
            console.error('Помилка під час читання з localStorage:', error);
            return true; 
        }
    }, []);
    

    const addProductInCart = useCallback((product: ProductInBasket) => {
        if (isLocalCartEmpty()) {
            const products: ProductInBasket[] = [];
            products.push(product)
            saveEncryptedObject(storageCartName,products,secretKey);
            // localStorage.setItem(storageCartName, JSON.stringify(products));
        }
        else {
            const products = getDecryptedObject(storageCartName,secretKey) as ProductInBasket[];
            // const products = JSON.parse(localStorage.getItem(storageCartName)!) as ProductInBasket[];
            products.push(product);
            const data = getDecryptedObject(storageCartName,secretKey);
            // const data = localStorage.getItem(storageCartName);
            if (data) {
                saveEncryptedObject(storageCartName,[],secretKey);
                // localStorage.setItem(storageCartName, JSON.stringify([]))
            }
            saveEncryptedObject(storageCartName,products,secretKey);
            // localStorage.setItem(storageCartName, JSON.stringify(products));
        }
    }, [])

    const setUserBasketFromLocal = useCallback(() => {
        const products = getDecryptedObject(storageCartName,secretKey) as ProductInBasket[];
        // const products = JSON.parse(localStorage.getItem(storageCartName)!) as ProductInBasket[];
        setProducts(products);
    }, [])

    const setUserBasketFromBase = useCallback((Basket: Basket) => {
        setProducts(Basket.products);
        saveEncryptedObject(storageCartName,Basket.products,secretKey);
        // localStorage.setItem(storageCartName, JSON.stringify(Basket.products))
    }, [])



    const login = useCallback((jwtToken: string, user: User) => {
        setToken(jwtToken);
        setUser(user);

        saveEncryptedObject(storageName,{user: user, token: jwtToken},secretKey);
        // localStorage.setItem(storageName, JSON.stringify({
        //     user: user, token: jwtToken
        // }))
    }, [])

    const clearCart = useCallback(() => {
        setProducts([]);
        localStorage.removeItem(storageCartName);
    }, [])

    const logout = useCallback(() => {
        setToken("");
        setUser(initState);
        localStorage.removeItem(storageName);
        localStorage.removeItem(storageCartName);
    }, [])

    useEffect(() => {
        const data = getDecryptedObject(storageName,secretKey)
        // const data = JSON.parse(localStorage.getItem(storageName)!);

        if (data && data.token) {
            login(data.token, data.user)
        }
    }, [login])
    return { clearCart, deleteProduct, isLocalCartEmpty, changeCount, addProductInCart, setUserBasketFromLocal, setUserBasketFromBase, login, logout, token, user, ProductInBasket };
}