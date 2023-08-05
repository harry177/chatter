import React, { useState } from 'react';
import { EntryLogo } from '../EntryLogo/EntryLogo';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { Chat } from '../Chat/Chat';
import { useAppSelector } from '../../app/hooks';
import './CommonView.styles.scss';

export const CommonView = () => {
  const user = useAppSelector((state) => state.user.user);
  const [isLogin, setIsLogin] = useState(true);

  const handleViewChange = (view: React.SetStateAction<boolean>) => {
    setIsLogin(view);
  };

  return (
    <main className="central">
      <EntryLogo />
      {!isLogin && !user && <SignUpForm dispatchBack={handleViewChange} />}
      {isLogin && !user && <SignInForm dispatchBack={handleViewChange} />}
      {user && <Chat />}
    </main>
  );
};
