import React, { useEffect, useState } from 'react';
import './Chat.styles.scss';
import { ChatField } from '../ChatField/ChatField';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatUsers } from '../ChatUsers/ChatUsers';
import { io } from 'socket.io-client';

interface IChat {
  open: string;
}

const socket = io();

export const Chat: React.FC<IChat> = ({ open }) => {
  const [state, setState] = useState('');
  const [chat, setChat] = useState('');

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
  });

  if (!open) return null;
  return (
    <div className="chat">
      <ChatUsers dispatchChatState={handleChatState} />
      <div className="right-chat__block">
        <ChatField storage={state} chatSpeaker={chat} />
        <ChatInput setStorage={handleStorageChange} chatSpeaker={chat} />
      </div>
    </div>
  );
};
