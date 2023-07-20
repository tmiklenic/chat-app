import React from 'react';
import './styling/ChatWindow.css';
import ChatMessage from './ChatMessage';

const ChatWindow = ({messages, user}) => {
    console.log("user: "+user)
    return (
        <div className="chat-window">
            <ul>
                {messages.map(message => <ChatMessage key={message.key} message={message} author={message.author} currentUser={user}/>)}
            </ul>
        </div>
    );
}

export default ChatWindow;
