import React, { useEffect, useState } from 'react';
import './ChatField.styles.scss';
import { io } from 'socket.io-client';

interface IChatField {
  storage: string;
  chatSpeaker: string;
}

const socket = io('http://localhost:3000');

export const ChatField: React.FC<IChatField> = ({ storage, chatSpeaker }) => {
  const user = localStorage.getItem('user');

  const [state, setState] = useState([]);

  useEffect(() => {
    socket.emit('chat message', {
      user,
      speaker: chatSpeaker,
      message: storage,
    });
    socket.on('message stack', (msg) => {
      console.log(msg);
      setState(msg);
    });
  }, [storage, chatSpeaker, user]);

  console.log(chatSpeaker);

  return (
    <div className="chat-field">
      {storage &&
        state.map((message) => {
          return (
            <p key={state.indexOf(message)} className="chat-item">
              {message}
            </p>
          );
        })}
    </div>
  );
};
