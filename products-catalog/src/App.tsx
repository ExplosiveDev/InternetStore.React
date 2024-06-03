import React, { FC, useEffect, useState } from "react";
import MyRoutes from "./pages/MyRoutes";
import { useAuth } from "./components/hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { useMessage } from "./components/hooks/message.hook";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import Message from "./Models/Message";

const App: FC = () => {
    const { clearCart, deleteProductFromBasket, isLocalCartEmpty, changeCount, addProductInCart, setUserBasketFromLocal, setUserBasketFromBase, login, logout, token, user, ProductInBasket } = useAuth();
    const { addMessage, clearUnreadCount, profileMessages, unreadCount } = useMessage();
    const isAuthenticated = !!token;
    const [connection, setConnection] = useState<HubConnection | null>(null);

    useEffect(() => {
        if (user?.roles.includes("Admin")) {

            const connectToChat = async () => {
                if (user && user.roles.includes("Admin")) {
                    try {
                        const newConnection = new HubConnectionBuilder()
                            .withUrl("https://localhost:7250/chat")
                            .withAutomaticReconnect()
                            .build();
                        newConnection.on("ReceiveMessage", (message: Message) => {
                            addMessage(message);
                            console.log(message);
                        });
                        await newConnection.start();
                        await newConnection.invoke("JoinChat", {
                            userName: user.userName,
                            role: "Admin",
                            chatRoom: "BecomeSaller"
                        });
                        setConnection(newConnection);
                    } catch (error) {
                        console.error(error);
                    }
                }
            };

            if (isAuthenticated) {
                connectToChat();
            }

            return () => {
                if (connection) {
                    connection.off("ReceiveMessage");
                    connection.stop();
                }
            };
        }
    }, [isAuthenticated, user]);

    return (
        <>
            <AuthContext.Provider value={{
                token: token || "",
                user: user || null,
                ProductInBasket: ProductInBasket || [],
                ProfileMessages: profileMessages || [],
                UnreadCount: unreadCount || 0,
                clearUnreadCount,
                addMessage,
                deleteProductFromBasket,
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

export default App;
