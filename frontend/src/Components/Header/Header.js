import React from 'react';
import './Header.styles.scss';
export const Header = ({ user }) => {
    if (user)
        return React.createElement("header", { className: "header" },
            "Welcome ",
            user);
    return React.createElement("header", { className: "header" }, "Welcome to Chatter app!");
};
