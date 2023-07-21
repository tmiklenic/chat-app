import React from 'react';
import './styling/ChatMessage.css';

const ChatMessage = ({message, currentUser}) => {

    const isAuthor = message.author === currentUser.username;

    const messageBackground = isAuthor ? currentUser.color : "rgb(161, 161, 161)";

    return (
        <li className="chat-message-box">
             <div className={"chat-message "+ (isAuthor ? "author-message" : "others-message")} style={{backgroundColor: messageBackground}}>
            {message.contents}
        </div>
         <div className={"message-sender " + (isAuthor ? "author-sender" : "")}>{message.author}</div>
        </li>
    );
}

export default ChatMessage;
