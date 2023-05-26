import React from 'react';
import './UserItem.style.scss';

interface IUserItem {
  userName: string;
}

export const UserItem: React.FC<IUserItem> = ({ userName }) => {
  return (
    <div className="user-item">
      <div className="user-item__avatar"></div>
      <div className="user-item__main">
        <div className="user-item__name">{userName}</div>
        <div className="user-item__message"></div>
      </div>
    </div>
  );
};
