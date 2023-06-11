import React, { useState } from 'react';
import './CommonView.styles.scss';
import { EntryLogo } from '../EntryLogo/EntryLogo';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { Chat } from '../Chat/Chat';
export const CommonView = ({ dispatchData, finalData }) => {
    const [isLogin, setIsLogin] = useState(true);
    const handleViewChange = (view) => {
        setIsLogin(view);
    };
    return (React.createElement("main", { className: "central" },
        React.createElement(EntryLogo, { param: finalData }),
        isLogin && !finalData && (React.createElement(SignUpForm, { dispatchName: dispatchData, dispatchView: handleViewChange })),
        !isLogin && !finalData && (React.createElement(SignInForm, { setProps: dispatchData, dispatchBack: handleViewChange })),
        React.createElement(Chat, { open: finalData })));
};
