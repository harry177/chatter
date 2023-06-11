import React from 'react';
import './EntryLogo.styles.scss';
export const EntryLogo = ({ param }) => {
    if (param)
        return null;
    return React.createElement("div", { className: "entry-logo" }, "Chatter");
};
