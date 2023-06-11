import React, { useEffect, useState } from 'react';
import './ChatField.styles.scss';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
export const ChatField = ({ storage, chatSpeaker }) => {
    const user = localStorage.getItem('user');
    const [state, setState] = useState([]);
    useEffect(() => {
        socket.emit('chat message', {
            user,
            speaker: chatSpeaker,
            message: storage,
        });
        socket.on('message stack', (msg) => {
            console.log(msg);
            setState(msg);
        });
    }, [storage, chatSpeaker, user]);
    console.log(chatSpeaker);
    return (React.createElement("div", { className: "chat-field" }, (storage || chatSpeaker) &&
        state.map((message) => {
            return (React.createElement("div", { key: state.indexOf(message), className: message.hero === user ? 'chat-item__hero' : 'chat-item__npc' }, message.comment));
        })));
};
