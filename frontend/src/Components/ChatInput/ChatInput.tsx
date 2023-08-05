import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { ChatButton } from '../ChatButton/ChatButton';
import './ChatInput.styles.scss';

interface IStorage {
  setStorage: React.Dispatch<React.SetStateAction<string>>;
  chatSpeaker: string;
}

export const ChatInput: React.FC<IStorage> = ({ setStorage, chatSpeaker }) => {
  const [state, setState] = useState('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setState(event.target.value);
  };

  const handleClick = () => {
    if (state) {
      setStorage(state);
      setState('');
    }
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && state) {
      setStorage(state);
      setState('');
    }
  };

  if (!chatSpeaker) return null;
  return (
    <div className="general__chat-input">
      <div className="chat-input">
        <input
          className="chat-input__field"
          type="text"
          onChange={handleInput}
          onKeyDown={handleEnter}
          value={state}
        ></input>
        <ChatButton
          buttonType="submit"
          buttonText="Send"
          clickFunction={handleClick}
          style={'15px'}
        />
      </div>
    </div>
  );
};
