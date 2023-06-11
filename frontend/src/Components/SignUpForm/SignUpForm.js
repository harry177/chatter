import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './SignUpForm.styles.scss';
export const SignUpForm = ({ dispatchName, dispatchView }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [isEmail, setIsEmail] = useState('');
    const handleForm = () => {
        createUser();
    };
    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handlePass = (event) => {
        setPass(event.target.value);
    };
    const handleConfirm = (event) => {
        setConfirm(event.target.checked);
    };
    const handleMove = () => {
        dispatchView(false);
    };
    const createUser = async () => {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                password: pass,
            }),
        });
        const user = await response.json();
        if (user.message === 'User with such email is aready existed') {
            setIsEmail(user.message);
        }
        if (user.user) {
            dispatchName(user.user.name);
            localStorage.setItem('user', user.user.name);
            console.log(user.token);
        }
    };
    const { register, formState: { errors }, handleSubmit, } = useForm();
    return (React.createElement("form", { className: "form", onSubmit: handleSubmit(handleForm) },
        React.createElement("label", { htmlFor: "username" }, "Username"),
        React.createElement("input", { type: "text", id: "username", ...register('nameLabel', { required: true, minLength: 3 }), onChange: handleName, className: "form-field username-input" }),
        errors?.nameLabel?.type === 'required' && (React.createElement("span", null, "The field cannot be empty. Please, enter your name")),
        errors?.nameLabel?.type === 'minLength' && (React.createElement("span", null, "The length of name must be at least 3 characters long. Try again")),
        React.createElement("label", { htmlFor: "email" }, "Email"),
        React.createElement("input", { type: "email", id: "email", ...register('emailLabel', { required: true }), onChange: handleEmail, className: "form-field email-input" }),
        errors?.emailLabel?.type === 'required' && (React.createElement("span", null, "The field cannot be empty. Please, enter your email")),
        isEmail,
        React.createElement("label", { htmlFor: "password" }, "Password"),
        React.createElement("input", { type: "text", id: "password", ...register('passLabel', { required: true, minLength: 5 }), onChange: handlePass, className: "form-field password-input" }),
        errors?.passLabel?.type === 'required' && (React.createElement("span", null, "The field cannot be empty. Please, enter your name")),
        errors?.passLabel?.type === 'minLength' && (React.createElement("span", null, "The length of name must be at least 5 characters long. Try again")),
        React.createElement("label", { htmlFor: "confirm" }, "Confirmation"),
        React.createElement("input", { type: "checkbox", id: "confirm", ...register('confirmLabel', { required: true }), onChange: handleConfirm, className: confirm ? 'form-field confirm-active' : 'form-field confirm-input' }),
        errors?.confirmLabel?.type === 'required' && (React.createElement("span", null, "The field cannot be empty. To enter, you should read and approve conditions")),
        React.createElement("div", null,
            React.createElement("button", { type: "submit", className: "submit-button" }, "Submit"),
            React.createElement("button", { onClick: handleMove }, "Move to Login"))));
};
