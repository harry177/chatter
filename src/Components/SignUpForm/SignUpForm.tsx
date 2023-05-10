import React, { ChangeEvent, useState } from 'react';
import './SignUpFormStyles.scss';

interface IProps {
  dispatchName: React.Dispatch<React.SetStateAction<string>>;
  dispatchView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUpForm: React.FC<IProps> = ({ dispatchName, dispatchView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [isEmail, setIsEmail] = useState('');
  //const [isPassword, setIsPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createUser();
    //return null;
  };

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
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
    if (user.name) {
      dispatchName(user.name);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        onChange={handleName}
        className="form-field username-input"
      ></input>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        onChange={handleEmail}
        className="form-field email-input"
      ></input>
      {isEmail}
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        onChange={handlePass}
        className="form-field password-input"
      ></input>
      <label htmlFor="confirm">Confirmation</label>
      <input type="checkbox" id="confirm" className="form-field confirm-input"></input>
      <button type="submit" className="submit-button">
        Submit
      </button>
      <button onClick={handleMove}>Move to Login</button>
    </form>
  );
};
