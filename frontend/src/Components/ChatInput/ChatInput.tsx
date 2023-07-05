import React, { ChangeEvent, useState } from 'react';
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

  if (!chatSpeaker) return null;
  return (
    <div className="chat-input">
      <input className="chat-input__field" type="text" onChange={handleInput} value={state}></input>
      <button className="chat-input__button" type="submit" onClick={handleClick}>
        Send
      </button>
    </div>
  );
};
