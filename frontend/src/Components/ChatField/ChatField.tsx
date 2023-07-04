import React, { memo, useEffect, useState } from 'react';
import './ChatField.styles.scss';
import { ChatMessage } from '../ChatMessage/ChatMessage';
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
  const [chatter, setChatter] = useState('');

  useEffect(() => {
    if (user && chatSpeaker) {
      const room = [user, chatSpeaker].sort((a, b) => (a < b ? -1 : 1)).join('');
      socket.emit('join room', { user, speaker: chatSpeaker, formerSpeaker: chatter, room });
      setChatter(chatSpeaker);
    }
  }, [chatSpeaker, user]);

  useEffect(() => {
    socket.emit('chat message', {
      user,
      speaker: chatSpeaker,
      message: storage,
    });
  }, [storage]);

  useEffect(() => {
    socket.on('message stack', (msg) => {
      console.log(msg);
      setState(msg);
    });
  });

  console.log(user);
  console.log(chatSpeaker);

  return (
    <div className="chat-field">
      {(storage || chatSpeaker) &&
        state.map((message) => {
          return <ChatMessage key={state.indexOf(message)} mail={message} />;
        })}
    </div>
  );
});
