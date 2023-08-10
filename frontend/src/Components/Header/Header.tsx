import React from 'react';
import { MainUser } from '../MainUser/MainUser';
import { useAppSelector } from '../../app/hooks';
import './Header.styles.scss';

export const Header = () => {
  const user = useAppSelector((state) => state.user.user);
  if (user)
    return (
      <header className="header">
        <div className="header-container">
          <MainUser />
        </div>
      </header>
    );
  return <header className="header">Welcome to Chatter app!</header>;
};
