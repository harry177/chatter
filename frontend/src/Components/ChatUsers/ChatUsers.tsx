import React, { useEffect, useState } from 'react';
import { UserItem } from '../UserItem/UserItem';
import { io } from 'socket.io-client';
import './ChatUsers.styles.scss';

interface IUsers {
  name: string;
}

interface IChatUsers {
  dispatchChatState: React.Dispatch<React.SetStateAction<string>>;
}

const socket = io('http://localhost:3000');

export const ChatUsers: React.FC<IChatUsers> = ({ dispatchChatState }) => {
  const cool = localStorage.getItem('user');

  const [allUsers, setAllUsers] = useState<IUsers[]>([]);

  useEffect(() => {
    socket.emit('get users');
    socket.on('all users', (data) => {
      const dataResult = data.filter((user: IUsers) => user.name !== cool);
      setAllUsers(dataResult);
    });
    return () => {
      socket.off('all users');
    };
  }, [allUsers, cool]);

  return (
    <div className="chat-users">
      {allUsers &&
        allUsers.map((user) => {
          return (
            <UserItem
              key={allUsers.indexOf(user)}
              userName={user.name}
              dispatchChat={dispatchChatState}
            />
          );
        })}
    </div>
  );
};
