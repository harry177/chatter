import React, { useState } from 'react';
import './CommonView.scss';
import { Header } from '../Header/Header';
import { EntryLogo } from '../EntryLogo/EntryLogo';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { Footer } from '../Footer/Footer';
import { Chat } from '../Chat/Chat';

export const CommonView = () => {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [data, setData] = useState('');

  const handleSignUpChange = (param: React.SetStateAction<boolean>) => {
    setRegister(param);
  };

  const handleDataChange = (data: React.SetStateAction<string>) => {
    setData(data);
  };

  const handleSignInChange = (param: React.SetStateAction<boolean>) => {
    setLogin(param);
  };

  const isUser = localStorage.getItem('user');
  console.log(isUser);

  return (
    <div className="general">
      <Header user={data} />
      <div className="central">
        <EntryLogo param={register || login} />
        {!isUser && <SignUpForm setProps={handleSignUpChange} setName={handleDataChange} />}
        {isUser && <SignInForm setProps={handleSignInChange} />}
        <Chat open={register || login} />
      </div>
      <Footer />
    </div>
  );
};
