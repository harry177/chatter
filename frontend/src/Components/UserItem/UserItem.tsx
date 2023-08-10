import React from 'react';
import './UserItem.style.scss';

interface IUserItem {
  userName: string;
  dispatchChat: React.Dispatch<React.SetStateAction<string>>;
  online: boolean;
  chat: string;
}

export const UserItem: React.FC<IUserItem> = ({ userName, dispatchChat, online, chat }) => {
  const selectChat = () => {
    dispatchChat(userName);
  };

  sessionStorage.setItem('chat', chat);

  return (
    <div className="user-item__container">
      <div
        className={online ? 'user-online' : 'user-item'}
        onClick={selectChat}
        style={{ border: chat === userName ? '2px black solid' : 'none' }}
      >
        <div className="user-item__avatar"></div>
        <div className="user-item__main">
          <div className="user-item__name">{userName}</div>
          <div className="user-item__message"></div>
        </div>
      </div>
    </div>
  );
};
