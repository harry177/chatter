import React, { useState } from 'react';
import './CommonView.scss';
import { Header } from '../Header/Header';
import { EntryLogo } from '../EntryLogo/EntryLogo';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { Footer } from '../Footer/Footer';
import { Chat } from '../Chat/Chat';

export const CommonView = () => {
  const [register, setRegister] = useState('');
  const [login, setLogin] = useState(false);
  const [data, setData] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(true);

  const handleSignUpChange = (param: React.SetStateAction<string>) => {
    setRegister(param);
  };

  const handleDataChange = (data: React.SetStateAction<string>) => {
    setData(data);
  };

  const handleSignInChange = (param: React.SetStateAction<boolean>) => {
    setLogin(param);
  };

  const handleViewChange = (view: React.SetStateAction<boolean>) => {
    setIsLogin(view);
  };

  const handleFormChange = (display: React.SetStateAction<boolean>) => {
    setForm(display);
  };

  return (
    <div className="general">
      <Header user={data} />
      <div className="central">
        <EntryLogo param={data} />
        {isLogin && !data && (
          <SignUpForm
            setProps={handleSignUpChange}
            dispatchName={handleDataChange}
            dispatchView={handleViewChange}
            dispatchForm={handleFormChange}
          />
        )}
        {!isLogin && !data && (
          <SignInForm setProps={handleDataChange} dispatchBack={handleViewChange} />
        )}
        <Chat open={data} />
      </div>
      <Footer />
    </div>
  );
};
