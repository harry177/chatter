import React, { useEffect, useState } from 'react';
import { UserItem } from '../UserItem/UserItem';
import { io } from 'socket.io-client';
import './ChatUsers.styles.scss';
const socket = io('http://localhost:3000');
export const ChatUsers = ({ dispatchChatState }) => {
    const cool = localStorage.getItem('user');
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        socket.emit('get users');
        socket.on('all users', (data) => {
            const dataResult = data.filter((user) => user.name !== cool);
            setAllUsers(dataResult);
        });
        return () => {
            socket.off('all users');
        };
    }, [allUsers, cool]);
    return (React.createElement("div", { className: "chat-users" }, allUsers &&
        allUsers.map((user) => {
            return (React.createElement(UserItem, { key: allUsers.indexOf(user), userName: user.name, dispatchChat: dispatchChatState }));
        })));
};
