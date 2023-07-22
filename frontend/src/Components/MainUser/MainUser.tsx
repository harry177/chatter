import React from 'react';
import './MainUser.styles.scss';
import '../../App.scss';
import { ChatButton } from '../ChatButton/ChatButton';

interface IMainUser {
  user: string;
  dispatchExit: React.Dispatch<React.SetStateAction<string>>;
}

export const MainUser: React.FC<IMainUser> = ({ user, dispatchExit }) => {
  const logOut = () => {
    dispatchExit('');
  };
  return (
    <div className="main-user">
      <div className={user ? 'main-user__image-active' : 'main-user__image'} />
      <div className="main-user__info">
        <div>{user}</div>
      </div>
      <ChatButton buttonType="button" buttonText="Exit" clickFunction={logOut} style={'30px'} />
    </div>
  );
};
