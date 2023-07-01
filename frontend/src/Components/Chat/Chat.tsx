import React, { useState } from 'react';
import './Chat.styles.scss';
import { ChatField } from '../ChatField/ChatField';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatUsers } from '../ChatUsers/ChatUsers';

interface IChat {
  open: string;
}

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

  if (!open) return null;
  return (
    <div className="chat">
      <ChatUsers dispatchChatState={handleChatState} />
      <div className="right-chat__block">
        <ChatField storage={state} chatSpeaker={chat} />
        <ChatInput setStorage={handleStorageChange} />
      </div>
    </div>
  );
};
