import React, { useState } from 'react';
import './ChatInput.styles.scss';
export const ChatInput = ({ setStorage }) => {
    const [state, setState] = useState('');
    const handleInput = (event) => {
        event.preventDefault();
        setState(event.target.value);
    };
    const handleClick = () => {
        if (state) {
            setStorage(state);
            setState('');
        }
    };
    return (React.createElement("div", { className: "chat-input" },
        React.createElement("input", { className: "chat-input__field", type: "text", onChange: handleInput, value: state }),
        React.createElement("button", { className: "chat-input__button", type: "submit", onClick: handleClick }, "Send")));
};
