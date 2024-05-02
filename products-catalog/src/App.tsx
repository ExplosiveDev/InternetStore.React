import React, { FC } from "react";
import MyRoutes from "./pages/MyRoutes";
import { useAuth } from "./components/hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
//Hello world
const App: FC = () => {

    const {clearCart,deleteProduct,isLocalCartEmpty,changeCount,addProductInCart,setUserBasketFromLocal,setUserBasketFromBase,login, logout, token, user, ProductInBasket } = useAuth();
    const isAuthenticated = !!token;
    return (
        <>
            <AuthContext.Provider value={{               
                token:token || "",
                user: user || null,
                ProductInBasket: ProductInBasket || [],
                deleteProduct,
                isLocalCartEmpty,
                changeCount,
                addProductInCart,
                setUserBasketFromLocal,
                setUserBasketFromBase,
                clearCart,
                login,
                logout,
                isAuthenticated
            }}>
                <MyRoutes isAuthenticated={isAuthenticated} user={user!} ></MyRoutes>
            </AuthContext.Provider>
            
            
        </>
    )
}

export default App



