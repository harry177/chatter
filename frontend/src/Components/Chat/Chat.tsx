import React, { useEffect, useState } from 'react';
import './Chat.styles.scss';
import { ChatField } from '../ChatField/ChatField';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatUsers } from '../ChatUsers/ChatUsers';
import { socket } from '../../socket';

interface IChat {
  user: string;
}

export const Chat: React.FC<IChat> = ({ user }) => {
  const [state, setState] = useState('');
  const [chat, setChat] = useState('');
  const [online, setOnline] = useState<string[]>([]);

  const handleChatState = (chat: React.SetStateAction<string>) => {
    setChat(chat);
    setState('');
  };

  const handleStorageChange = (state: React.SetStateAction<string>) => {
    setState(state);
  };

  const connect = () => {
    socket.auth = { user };
    socket.connect();
    socket.emit('addUser', user);
    socket.on('getUsers', (users) => {
      setOnline(users);
    });
  };

  useEffect(() => {
    connect();
  }, [user]);

  useEffect(() => {
    socket.on('getUsers', (users) => {
      setOnline(users);
      if (
        !users.find((mainUser: string) => {
          mainUser === user;
        }) &&
        user !== ''
      ) {
        connect();
      }
    });
    return () => {
      socket.off('getUsers');
    };
  });

  if (!user) return null;
  return (
    <div className="chat">
      <ChatUsers dispatchChatState={handleChatState} online={online} />
      <div className="right-chat__block">
        <ChatField storage={state} chatSpeaker={chat} online={online} />
        <ChatInput setStorage={handleStorageChange} chatSpeaker={chat} />
      </div>
    </div>
  );
};
