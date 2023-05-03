import React, { ChangeEvent, useState } from 'react';
import './ChatInput.scss';

interface IStorage {
  setStorage: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatInput: React.FC<IStorage> = ({ setStorage }) => {
  const initialStack: string[] = JSON.parse(localStorage.getItem('stack') || '[]');
  const [state, setState] = useState('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  const handleClick = () => {
    initialStack.push(state);
    localStorage.setItem('stack', JSON.stringify(initialStack));
    setStorage(state);
  };

  return (
    <>
      <input type="text" onChange={handleInput}></input>
      <button type="submit" onClick={handleClick}>
        Send
      </button>
    </>
  );
};
