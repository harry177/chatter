import React, { useState } from 'react';
import './SignInForm.styles.scss';
export const SignInForm = ({ setProps, dispatchBack }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [isPassword, setIsPassword] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        checkUser();
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handlePass = (event) => {
        setPass(event.target.value);
    };
    const handleBack = () => {
        dispatchBack(true);
    };
    const checkUser = async () => {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: pass,
            }),
        });
        const user = await response.json();
        if (user.message === 'There is no user with such email!') {
            setIsEmail(user.message);
        }
        else if (user.message === 'Your password is incorrect') {
            setIsPassword(user.message);
        }
        else {
            setProps(user.name);
            localStorage.setItem('user', user.name);
            console.log(user.token);
        }
    };
    return (React.createElement("form", { className: "form", onSubmit: handleSubmit },
        React.createElement("label", { htmlFor: "email" }, "Email"),
        React.createElement("input", { type: "email", id: "email", onChange: handleEmail, className: "form-field email-input" }),
        isEmail,
        React.createElement("label", { htmlFor: "password" }, "Password"),
        React.createElement("input", { type: "text", id: "password", onChange: handlePass, className: "form-field password-input" }),
        isPassword,
        React.createElement("div", null,
            React.createElement("button", { type: "submit", className: "submit-button" }, "Submit"),
            React.createElement("button", { onClick: handleBack }, "Move to SignUp"))));
};
