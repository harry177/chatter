import React from 'react';
import './UserItem.style.scss';

interface IUserItem {
  userName: string;
  dispatchChat: React.Dispatch<React.SetStateAction<string>>;
  online: boolean;
}

export const UserItem: React.FC<IUserItem> = ({ userName, dispatchChat, online }) => {
  const selectChat = () => {
    sessionStorage.setItem('selectedChat', userName);
    console.log(userName);
    dispatchChat(userName);
  };

  return (
    <div className={online ? 'user-online' : 'user-item'} onClick={selectChat}>
      <div className="user-item__avatar"></div>
      <div className="user-item__main">
        <div className="user-item__name">{userName}</div>
        <div className="user-item__message"></div>
      </div>
    </div>
  );
};
