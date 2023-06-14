import React, { memo, useEffect, useState } from 'react';
import './ChatField.styles.scss';
import { io } from 'socket.io-client';

interface IChatField {
  storage: string;
  chatSpeaker: string;
}

interface IMessage {
  hero: string;
  comment: string;
}

const socket = io();

export const ChatField: React.FC<IChatField> = memo(({ storage, chatSpeaker }) => {
  const user = localStorage.getItem('user');

  const [state, setState] = useState<IMessage[]>([]);

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
      {(storage || chatSpeaker) &&
        state.map((message) => {
          return (
            <div
              key={state.indexOf(message)}
              className={message.hero === user ? 'chat-item__hero' : 'chat-item__npc'}
            >
              {message.comment}
            </div>
          );
        })}
    </div>
  );
});
