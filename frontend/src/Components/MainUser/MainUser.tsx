import React from 'react';
import './MainUser.styles.scss';
import '../../App.scss';

interface IMainUser {
  user: string;
}

export const MainUser: React.FC<IMainUser> = ({ user }) => {
  return (
    <div className="main-user">
      <div className={user ? 'main-user__image-active' : 'main-user__image'} />
      <div className="main-user__info">
        <div>{user}</div>
        <div>Settings</div>
      </div>
    </div>
  );
};
