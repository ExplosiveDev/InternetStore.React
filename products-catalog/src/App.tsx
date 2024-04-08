import React, { FC } from "react";
import MyRoutes from "./pages/MyRoutes";
import { useAuth } from "./components/hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
//Hello world
const App: FC = () => {

    const { login, logout, token, user } = useAuth();
    const isAuthenticated = !!token;
    return (
        <>
            <AuthContext.Provider value={{               
                token:token || "",
                user: user || null,
                login,
                logout,isAuthenticated
            }}>
                <MyRoutes isAuthenticated={isAuthenticated}></MyRoutes>
            </AuthContext.Provider>
            
            
        </>
    )
}

export default App



