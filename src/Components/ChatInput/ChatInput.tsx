import React, { ChangeEvent, useState } from 'react';
import './ChatInput.scss';

interface IStorage {
  setStorage: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatInput: React.FC<IStorage> = ({ setStorage }) => {
  const [state, setState] = useState('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setState(event.target.value);
  };

  const handleClick = () => {
    setStorage(state);
    setState('');
  };

  return (
    <div className="chat-input">
      <input className="chat-input__field" type="text" onChange={handleInput} value={state}></input>
      <button className="chat-input__button" type="submit" onClick={handleClick}>
        Send
      </button>
    </div>
  );
};
