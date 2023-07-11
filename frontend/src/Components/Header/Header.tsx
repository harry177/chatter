import React from 'react';
import './Header.styles.scss';
import { MainUser } from '../MainUser/MainUser';

interface IUser {
  user: string;
  dispatchExit: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<IUser> = ({ user, dispatchExit }) => {
  if (user)
    return (
      <header className="header">
        <div className="header-container">
          <MainUser user={user} dispatchExit={dispatchExit} />
        </div>
      </header>
    );
  return <header className="header">Welcome to Chatter app!</header>;
};
