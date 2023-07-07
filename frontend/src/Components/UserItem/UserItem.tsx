import React from 'react';
import './UserItem.style.scss';

interface IUserItem {
  userName: string;
  dispatchChat: React.Dispatch<React.SetStateAction<string>>;
  online: string[];
}

export const UserItem: React.FC<IUserItem> = ({ userName, dispatchChat, online }) => {
  const selectChat = () => {
    sessionStorage.setItem('selectedChat', userName);
    console.log(userName);
    dispatchChat(userName);
  };

  const zatyk: string[] = [];

  return (
    <div className={online.includes(userName) ? 'user-online' : 'user-item'} onClick={selectChat}>
      <div className="user-item__avatar"></div>
      <div className="user-item__main">
        <div className="user-item__name">{userName}</div>
        <div className="user-item__message"></div>
      </div>
    </div>
  );
};
