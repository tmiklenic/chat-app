import React from 'react';
import './styling/ChatHeader.css';

const ChatHeader = ({username, color}) => {
    return (
        <div id='chat-header'>
            <span id="chat-name">MegaChat</span>
            <div>
                Your username: {username}
                <div id="user-color" style={{backgroundColor: color}}></div>
            </div>
            
        </div>
    );
}

export default ChatHeader;
