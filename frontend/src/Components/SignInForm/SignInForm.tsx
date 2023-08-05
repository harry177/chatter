import React, { ChangeEvent, useState } from 'react';
import { FormButton } from '../FormButton/FormButton';
import { useAppDispatch } from '../../app/hooks';
import { toggleUser } from '../../features/slices/userSlice';
import '../SignUpForm/SignUpForm.styles.scss';

interface IProps {
  dispatchBack: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignInForm: React.FC<IProps> = ({ dispatchBack }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [isEmail, setIsEmail] = useState('');
  const [isPassword, setIsPassword] = useState('');

  const updateUser = useAppDispatch();

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
    dispatchBack(false);
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
      updateUser(toggleUser(user.name));
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
