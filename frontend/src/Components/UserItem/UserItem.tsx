import React, { useEffect, useState } from 'react';
import './UserItem.style.scss';
import { io } from 'socket.io-client';

interface IUserItem {
  userName: string;
  dispatchChat: React.Dispatch<React.SetStateAction<string>>;
}

const socket = io();

export const UserItem: React.FC<IUserItem> = ({ userName, dispatchChat }) => {
  const [online, setOnline] = useState<string[]>([]);

  const selectChat = () => {
    sessionStorage.setItem('selectedChat', userName);
    console.log(userName);
    dispatchChat(userName);
  };

  useEffect(() => {
    socket.on('note', (data) => {
      setOnline(data);
    });
    return () => {
      socket.off('note');
    };
  });

  console.log(online);

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
