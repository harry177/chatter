import React, { memo, useEffect, useState } from 'react';
import { motion, Reorder, useDragControls } from 'framer-motion';
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

  const controls = useDragControls();

  return (
    <div className="chat-users">
      <div className="chat-users__inner">
        <div className="chat-users__inner-container">
          <Reorder.Group
            as="div"
            axis="y"
            layoutScroll
            values={allUsers}
            onReorder={setAllUsers}
            style={{ listStyleType: 'none', width: '100%' }}
          >
            {allUsers &&
              allUsers.map((user) => {
                return (
                  <Reorder.Item
                    key={user}
                    value={user}
                    dragControls={controls}
                    dragListener={false}
                  >
                    <motion.div
                      key={allUsers.indexOf(user)}
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <UserItem
                        userName={user}
                        dispatchChat={dispatchChatState}
                        online={online.includes(user)}
                      />
                    </motion.div>
                  </Reorder.Item>
                );
              })}
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
});
