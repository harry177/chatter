import React, { useState } from 'react';
import './Chat.scss';
import { ChatField } from '../ChatField/ChatField';
import { ChatInput } from '../ChatInput/ChatInput';

interface IChat {
  open: string;
}

export const Chat: React.FC<IChat> = ({ open }) => {
  const [state, setState] = useState('');

  const handleStorageChange = (state: React.SetStateAction<string>) => {
    setState(state);
  };
  if (!open) return null;
  return (
    <div className="chat">
      <ChatField storage={state} />
      <ChatInput setStorage={handleStorageChange} />
    </div>
  );
};
