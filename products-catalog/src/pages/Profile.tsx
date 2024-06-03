import { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import Message from "../Models/Message";
import { getAllMessages } from "../services/messages";
import DisplayMessage from "../components/DisplayMessage";

const Profile: FC = () => {
    const [showMessages, setShowMessages] = useState(false);
    const [Messages, setMessages] = useState<Message[]>([]);
    const auth = useContext(AuthContext);


    useEffect(() => {
        if(showMessages){
            async function fetchData() {
                const MessagesData: Message[] = await getAllMessages(auth.token!);
                setMessages(MessagesData);
                auth.clearUnreadCount();
                console.log(MessagesData);
            }
            fetchData();
        }


    },[auth.ProfileMessages, showMessages])

    return (
        <div className="d-flex row mb-3 border border-3 rounded-3 border-dark" style={{ height: "90vh", backgroundColor: "#FF7373" }}>
            <div className="d-flex col-3 p-2 align-items-start" style={{}}>
                <button className="btn btn-primary w-100" onClick={() => setShowMessages(!showMessages)}>
                    Сповіщення
                </button>
            </div>
            <div className="d-flex col-9 justify-content-center" style={{fontSize: "1.5rem", backgroundColor: "#BF3030"}}>
                {showMessages && (
                    <DisplayMessage messageArray={Messages}></DisplayMessage>
                )}
            </div>
        </div>
    );
};

export default Profile;
