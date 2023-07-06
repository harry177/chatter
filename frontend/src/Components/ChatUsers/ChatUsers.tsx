import React, { useEffect, useState } from 'react';
import { UserItem } from '../UserItem/UserItem';
import { io } from 'socket.io-client';
import './ChatUsers.styles.scss';

/*interface IUsers {
  name: string;
}*/

interface IChatUsers {
  dispatchChatState: React.Dispatch<React.SetStateAction<string>>;
}

const socket = io();

export const ChatUsers: React.FC<IChatUsers> = ({ dispatchChatState }) => {
  const cool = localStorage.getItem('user');

  const [allUsers, setAllUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.emit('getUsers');
  }, [allUsers, cool]);

  useEffect(() => {
    socket.on('allUsers', (data) => {
      const dataResult = data.filter((username: string) => username !== cool);
      setAllUsers(dataResult);
    });
    return () => {
      socket.off('allUsers');
    };
  });

  return (
    <div className="chat-users">
      {allUsers &&
        allUsers.map((user) => {
          return (
            <UserItem
              key={allUsers.indexOf(user)}
              userName={user}
              dispatchChat={dispatchChatState}
            />
          );
        })}
    </div>
  );
};
