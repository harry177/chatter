import React, { ChangeEvent, useState } from 'react';
import './SignInFormStyles.scss';

interface IProps {
  setProps: React.Dispatch<React.SetStateAction<string>>;
  dispatchBack: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignInForm: React.FC<IProps> = ({ setProps, dispatchBack }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [isEmail, setIsEmail] = useState('');
  const [isPassword, setIsPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    checkUser();
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePass = (event: ChangeEvent<HTMLInputElement>) => {
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
    } else if (user.message === 'Your password is incorrect') {
      setIsPassword(user.message);
    } else {
      setProps(user.name);
      console.log(user.token);
      console.log(user);
    }
  };

  /*const getFetch = async (event: React.MouseEvent) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (response.ok === true) {
      const users = await response.json();
      setDavay(JSON.stringify(users));
      console.log(users);
    }
  };*/

  return (
    <form className="form" onSubmit={handleSubmit}>
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
      {isPassword}
      <div>
        <button type="submit" className="submit-button">
          Submit
        </button>
        <button onClick={handleBack}>Move to SignUp</button>
      </div>
    </form>
  );
};
