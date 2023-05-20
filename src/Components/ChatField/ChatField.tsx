import React, { useEffect, useState } from 'react';
import './ChatField.scss';
import { io } from 'socket.io-client';

interface IChatField {
  storage: string;
}

const socket = io('http://localhost:3000');

export const ChatField: React.FC<IChatField> = ({ storage }) => {
  const user = localStorage.getItem('user');

  const [state, setState] = useState([]);

  useEffect(() => {
    socket.emit('chat message', {
      user,
      message: storage,
    });
    socket.on('message stack', (msg) => {
      console.log(msg);
      setState(msg);
    });
  }, [storage, user]);

  return (
    <div className="chat-field">
      {(storage || !storage) &&
        state.map((message) => {
          return <p key={state.indexOf(message)}>{message}</p>;
        })}
    </div>
  );
};
