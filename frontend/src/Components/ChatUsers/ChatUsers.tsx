import React, { memo, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { UserItem } from '../UserItem/UserItem';
import { socket } from '../../socket';
import './ChatUsers.styles.scss';

interface IChatUsers {
  dispatchChatState: React.Dispatch<React.SetStateAction<string>>;
  chatSpeaker: string;
  online: string[];
  user: string;
}

export const ChatUsers: React.FC<IChatUsers> = memo(
  ({ dispatchChatState, chatSpeaker, online, user }) => {
    const [allUsers, setAllUsers] = useState<string[]>([]);
    const [dropdown, setDropdown] = useState(false);

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });

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
      <div className={isTabletOrMobile ? 'common-container__mobile' : 'common-container'}>
        {isTabletOrMobile && (
          <div className="users-tab" onClick={() => setDropdown(!dropdown)}>
            {dropdown ? 'Hide users' : 'Show users'}
          </div>
        )}
        <div className={isTabletOrMobile && dropdown ? 'chat-users__mobile' : 'chat-users'}>
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
                            chat={chatSpeaker}
                          />
                        </motion.div>
                      </Reorder.Item>
                    );
                  })}
              </Reorder.Group>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
