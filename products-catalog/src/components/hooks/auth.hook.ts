import { useCallback, useState, useEffect } from "react"
import User from "../../Models/User";
import Basket from "../../Models/Basket";
import ProductInBasket from "../../Models/ProductInBasket";

const storageName = 'userData';
const storageCartName = 'userCart';

const initState = {
    id:'',
    userName:'',
    email: '',
    passwordHash: '',
};

export const useAuth = () =>{
    
    const [token,setToken] = useState<string | null>();
    const [user,setUser] = useState<User | null>();
    const [basket,setBasket] = useState<Basket | null>();
    const [ProductInBasket,setProducts] = useState<ProductInBasket[] | null>();


    const changeCount = useCallback( (operation:string, productId:string) => {
        const products = JSON.parse(localStorage.getItem(storageCartName)!) as ProductInBasket[];
        

        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {

            if (operation === "CountPlus") {
                products[productIndex].count++;
            } else if (operation === "CountMinus" && products[productIndex].count > 1) {
                products[productIndex].count--;
            }
            
            setProducts(products);
            localStorage.setItem(storageCartName, JSON.stringify(products));
            
            console.log(products);
        } else {
            console.log("Product not found in the basket.");
        }
    }, [])

    const setUserBasket = useCallback( (Basket:Basket) => {
        setBasket(Basket);
        setProducts(Basket.products);
        localStorage.setItem(storageCartName, JSON.stringify( Basket.products))
    }, [])

    const login = useCallback( (jwtToken:string, user:User) => {
        setToken(jwtToken);
        setUser(user);

        localStorage.setItem(storageName, JSON.stringify( {
            user:user, token:jwtToken
        }))
    }, [])
    
    const logout = useCallback ( () => {
        setToken("");
        setUser(initState);
        localStorage.removeItem(storageName);
    }, [])

    useEffect( () => {
        const data = JSON.parse(localStorage.getItem(storageName)!);

        if(data && data.token){
            login(data.token,data.user)
        }
    }, [login])
    return {changeCount,setUserBasket,login, logout, token, user, basket, ProductInBasket};
}