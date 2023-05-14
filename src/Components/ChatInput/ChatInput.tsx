import React, { ChangeEvent, useState } from 'react';
import './ChatInput.scss';

interface IStorage {
  setStorage: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatInput: React.FC<IStorage> = ({ setStorage }) => {
  const initialStack: string[] = JSON.parse(localStorage.getItem('stack') || '[]');
  const [state, setState] = useState('');
  const [users, setUsers] = useState('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  async function getUsers() {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (response.ok === true) {
      const users = await response.json();
      console.log(users[0].name);
      setUsers(users[0].name);
    }
  }

  const sendMessage = async () => {
    const response = await fetch('http://localhost:3000/api/savemess', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: localStorage.getItem('user'),
        message: state,
      }),
    });
    const user = await response.json();
    if (user) {
      console.log(user);
    }
  };

  const handleClick = () => {
    initialStack.push(state);
    localStorage.setItem('stack', JSON.stringify(initialStack));
    setStorage(state);
    sendMessage();
  };

  return (
    <div className="chat-input">
      <input type="text" onChange={handleInput}></input>
      <button type="submit" onClick={handleClick}>
        Send
      </button>
      <div>{users} - aha</div>
    </div>
  );
};
