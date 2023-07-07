import React from 'react';
import './Header.styles.scss';
import { MainUser } from '../MainUser/MainUser';

interface IUser {
  user: string;
}

export const Header: React.FC<IUser> = ({ user }) => {
  if (user)
    return (
      <header className="header">
        <div className="header-container">
          <MainUser user={user} />
        </div>
      </header>
    );
  return <header className="header">Welcome to Chatter app!</header>;
};
