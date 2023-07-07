import React, { useEffect, useState } from 'react';
import './Chat.styles.scss';
import { ChatField } from '../ChatField/ChatField';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatUsers } from '../ChatUsers/ChatUsers';
import { socket } from '../../socket';

interface IChat {
  open: string;
}

export const Chat: React.FC<IChat> = ({ open }) => {
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

  console.log(state);

  const user = localStorage.getItem('user');

  useEffect(() => {
    socket.auth = { user };
    socket.connect();
  }, [open, user]);

  useEffect(() => {
    socket.on('note', (data) => {
      console.log(data);
      setOnline(data);
      console.log(online);
    });
    return () => {
      socket.off('note');
    };
  }, [online]);

  if (!open) return null;
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
