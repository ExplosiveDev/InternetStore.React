import { FC } from "react";
import Message from "../Models/Message";
import SingleProduct from "./helpers/SingleProduct";
import SingleMessage from "./helpers/SingleMessage";


interface DisplayMessageProps {
    messageArray: Message[];
}

const DisplayMessage: FC<DisplayMessageProps> = ({ messageArray }) => {

    return (
        <div className="row g-2 m-0 flex-column w-100 ">
            {messageArray.map((message) => {
                return <SingleMessage key={message.id} message={message}/>
            })}
        </div>
    )

}

export default DisplayMessage;