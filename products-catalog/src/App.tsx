import React, { FC } from "react";
import MyRoutes from "./pages/MyRoutes";
import { useAuth } from "./components/hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
//Hello world
const App: FC = () => {

    const {changeCount,setUserBasket,login, logout, token, user, basket, ProductInBasket } = useAuth();
    const isAuthenticated = !!token;
    return (
        <>
            <AuthContext.Provider value={{               
                token:token || "",
                user: user || null,
                basket: basket || null,
                ProductInBasket: ProductInBasket || [],
                changeCount,
                setUserBasket,
                login,
                logout,isAuthenticated
            }}>
                <MyRoutes isAuthenticated={isAuthenticated}></MyRoutes>
            </AuthContext.Provider>
            
            
        </>
    )
}

export default App



