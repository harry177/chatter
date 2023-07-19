import React, { memo, useEffect, useState } from 'react';
import { UserItem } from '../UserItem/UserItem';
import { socket } from '../../socket';
import './ChatUsers.styles.scss';

interface IChatUsers {
  dispatchChatState: React.Dispatch<React.SetStateAction<string>>;
  online: string[];
  user: string;
}

export const ChatUsers: React.FC<IChatUsers> = memo(({ dispatchChatState, online, user }) => {
  const [allUsers, setAllUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.emit('getAll');
  }, [user, online]);

  useEffect(() => {
    socket.on('allUsers', (data) => {
      const dataResult = data.filter((username: string) => username !== user);
      const dataOnline = online.filter((username: string) => username !== user);
      const finalDataResult = dataOnline.concat(
        dataResult.filter((elem: string) => !dataOnline.includes(elem))
      );
      if (allUsers !== finalDataResult) {
        setAllUsers(finalDataResult);
        console.log(finalDataResult);
      }
    });
    return () => {
      socket.off('allUsers');
    };
  }, [allUsers, user, online]);

  console.log(user);

  return (
    <div className="chat-users">
      <div className="chat-users__inner">
        {allUsers &&
          allUsers.map((user) => {
            return (
              <UserItem
                key={allUsers.indexOf(user)}
                userName={user}
                dispatchChat={dispatchChatState}
                online={online.includes(user)}
              />
            );
          })}
      </div>
    </div>
  );
});
