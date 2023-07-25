import React from 'react';
import '../../App.scss';
import './SelectedUser.scss';

interface ISelectedUser {
  chat: string;
  online: string[];
}

export const SelectedUser: React.FC<ISelectedUser> = ({ chat, online }) => {
  return (
    <div className="selected-user">
      <div className={online.includes(chat) ? 'main-user__image-active' : 'main-user__image'}></div>
      <div className="main-user__info">
        <div>{chat}</div>
      </div>
    </div>
  );
};
