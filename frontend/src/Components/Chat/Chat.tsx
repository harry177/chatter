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

  useEffect(() => {
    socket.auth = { user };
    socket.connect();
    socket.emit('addUser', user);
    socket.on('getUsers', (users) => {
      setOnline(users);
    });
  }, [user]);

  useEffect(() => {
    socket.on('getUsers', (users) => {
      setOnline(users);
    });
    return () => {
      socket.off('getUsers');
    };
  });

  /*useEffect(() => {
    socket.on('note', (data) => {
      setOnline(data);
    });
    return () => {
      socket.off('note');
    };
  });*/

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
