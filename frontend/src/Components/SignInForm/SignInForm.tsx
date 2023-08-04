import React, { ChangeEvent, useState } from 'react';
import '../SignUpForm/SignUpForm.styles.scss';
import { FormButton } from '../FormButton/FormButton';

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
    const response = await fetch('/api/login', {
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
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        onChange={handleEmail}
        className="form-field email-input"
      ></input>
      <span>{isEmail}</span>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        onChange={handlePass}
        className="form-field password-input"
      ></input>
      <span>{isPassword}</span>
      <div className="form-buttons">
        <FormButton buttonType="submit" buttonText="Submit" />
        <FormButton buttonType="button" buttonText="Move to signup" clickFunction={handleBack} />
      </div>
    </form>
  );
};
