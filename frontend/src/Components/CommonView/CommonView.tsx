import React, { useState } from 'react';
import './CommonView.styles.scss';
import { EntryLogo } from '../EntryLogo/EntryLogo';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { SignInForm } from '../SignInForm/SignInForm';
import { Chat } from '../Chat/Chat';

interface IData {
  dispatchData: React.Dispatch<React.SetStateAction<string>>;
  finalData: string;
}

export const CommonView: React.FC<IData> = ({ dispatchData, finalData }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleViewChange = (view: React.SetStateAction<boolean>) => {
    setIsLogin(view);
  };

  return (
    <main className="central">
      <EntryLogo param={finalData} />
      {isLogin && !finalData && (
        <SignUpForm dispatchName={dispatchData} dispatchView={handleViewChange} />
      )}
      {!isLogin && !finalData && (
        <SignInForm setProps={dispatchData} dispatchBack={handleViewChange} />
      )}
      <Chat user={finalData} />
    </main>
  );
};
