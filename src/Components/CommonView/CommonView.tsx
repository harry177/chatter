import React, { useState } from 'react';
import './CommonView.scss';
import { Header } from '../Header/Header';
import { EntryLogo } from '../EntryLogo/EntryLogo';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { Footer } from '../Footer/Footer';
import { Chat } from '../Chat/Chat';

export const CommonView = () => {
  const [data, setData] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleDataChange = (data: React.SetStateAction<string>) => {
    setData(data);
  };

  const handleViewChange = (view: React.SetStateAction<boolean>) => {
    setIsLogin(view);
  };

  return (
    <div className="general">
      <Header user={data} />
      <div className="central">
        <EntryLogo param={data} />
        {isLogin && !data && (
          <SignUpForm dispatchName={handleDataChange} dispatchView={handleViewChange} />
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
