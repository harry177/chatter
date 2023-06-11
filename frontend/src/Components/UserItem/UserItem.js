import React from 'react';
import './UserItem.style.scss';
export const UserItem = ({ userName, dispatchChat }) => {
    const selectChat = () => {
        sessionStorage.setItem('selectedChat', userName);
        dispatchChat(userName);
    };
    return (React.createElement("div", { className: "user-item", onClick: selectChat },
        React.createElement("div", { className: "user-item__avatar" }),
        React.createElement("div", { className: "user-item__main" },
            React.createElement("div", { className: "user-item__name" }, userName),
            React.createElement("div", { className: "user-item__message" }))));
};
