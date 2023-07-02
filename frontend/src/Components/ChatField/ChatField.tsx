import React, { memo, useEffect, useState } from 'react';
import './ChatField.styles.scss';
import { io } from 'socket.io-client';

interface IChatField {
  storage: string;
  chatSpeaker: string;
}

/*interface IMessage {
  message: string;
}*/

interface IRoom {
  a: string | null;
  b: string | null;
}

const socket = io();

export const ChatField: React.FC<IChatField> = memo(({ storage, chatSpeaker }) => {
  const user = localStorage.getItem('user');

  //const [state, setState] = useState<IMessage[]>([]);
  const [state, setState] = useState<string[]>([]);

  useEffect(() => {
    if (user && chatSpeaker) {
      const room = [user, chatSpeaker].sort((a, b) => (a < b ? -1 : 1)).join('');
      socket.emit('join room', { user, speaker: chatSpeaker, room });
    }
    socket.on('message stack', (msg) => {
      console.log(msg);
      setState(msg);
    });
  }, [chatSpeaker, user]);

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
  }, [storage]);

  console.log(user);
  console.log(chatSpeaker);

  return (
    <div className="chat-field">
      {(storage || chatSpeaker) &&
        state.map((message) => {
          return (
            <div
              key={state.indexOf(message)}
              //className={message.hero === user ? 'chat-item__hero' : 'chat-item__npc'}
            >
              {message}
            </div>
          );
        })}
    </div>
  );
});
