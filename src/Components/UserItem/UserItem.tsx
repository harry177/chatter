import React, { useState } from 'react';
import './UserItem.style.scss';

interface IUserItem {
  userName: string;
  dispatchChat: React.Dispatch<React.SetStateAction<string>>;
}

export const UserItem: React.FC<IUserItem> = ({ userName, dispatchChat }) => {
  const [state, setState] = useState('');
  const selectChat = () => {
    sessionStorage.setItem('selectedChat', userName);
    setState(userName);
    dispatchChat(state);
  };

  return (
    <div className="user-item" onClick={selectChat}>
      <div className="user-item__avatar"></div>
      <div className="user-item__main">
        <div className="user-item__name">{userName}</div>
        <div className="user-item__message"></div>
      </div>
    </div>
  );
};
