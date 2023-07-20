import React, { useState } from 'react';
import './styling/ChatInputBox.css';

const ChatInputBox = (props) => {

    const [inputValue, setInputValue] = useState("");

    const inputChangeHandler = e => setInputValue(e.target.value);

    const submitChangeHandler = e => 
    {
        e.preventDefault();
        if (inputValue.trim() !== "") {
            props.onSubmitMessage(inputValue);
            setInputValue("");
        } else {
            alert("You need to enter a message");
        }
    }

    const keyPressHandler = e => {
        if (e.key === 'Enter') {
            submitChangeHandler(e);
        }
    };

    return (
        <div>
            <form id="searchForm" onSubmit={submitChangeHandler} onKeyDown={keyPressHandler}>
                <input id="searchInput" type="text" placeholder="Enter a text message" max="200" onChange={inputChangeHandler} value={inputValue} autoFocus/>
                <input id="searchButton" type="submit" value="Send"/>
            </form>
        </div>
    );
}

export default ChatInputBox;
