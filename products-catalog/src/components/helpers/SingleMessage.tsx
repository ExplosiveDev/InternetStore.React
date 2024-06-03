import React, { FC, useState, MouseEvent } from "react";
import Message from "../../Models/Message";
import { Link } from "react-router-dom";

interface SingleMessageProps {
    message: Message;
}

const SingleMessage: FC<SingleMessageProps> = ({ message }) => {

    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
      x: 0,
      y: 0,
    });
    return (
        <div>
            <div onContextMenu={(e) => {
            e.preventDefault();
            setClicked(true);
            setPoints({
              x: e.pageX,
              y: e.pageY,
            });
            console.log("Right Click", e.pageX, e.pageY);
          }}>
                <Link to={"d"} style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="col-12 d-flex border border-1 rounded-2 border-dark" style={{ backgroundColor: "#FF4040" }}>
                        <div className="col-4 d-flex justify-content-center border-end border-1 border-dark">{message.userName}</div>
                        <div className="col-8 d-flex justify-content-center">{message.userMessage}</div>
                    </div>
                </Link>
            </div>
    </div>
    );
}

export default SingleMessage;
