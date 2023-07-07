import React, { memo, useEffect, useRef, useState } from 'react';
import './ChatField.styles.scss';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { socket } from '../../socket';

interface IChatField {
  storage: string;
  chatSpeaker: string;
  online: string[];
}

interface IMessage {
  hero: string;
  comment: string;
}

export const ChatField: React.FC<IChatField> = memo(({ storage, chatSpeaker, online }) => {
  const user = localStorage.getItem('user');

  const [state, setState] = useState<IMessage[]>([]);
  const [chatter, setChatter] = useState('');

  useEffect(() => {
    if (user && chatSpeaker) {
      const room = [user, chatSpeaker].sort((a, b) => (a < b ? -1 : 1)).join('');
      socket.emit('joinRoom', { user, speaker: chatSpeaker, formerSpeaker: chatter, room });
      setChatter(chatSpeaker);
    }
  }, [chatSpeaker, user]);

  useEffect(() => {
    socket.emit('chatMessage', {
      user,
      speaker: chatSpeaker,
      message: storage,
    });
  }, [storage]);

  useEffect(() => {
    socket.on('messageStack', (msg) => {
      console.log(msg);
      setState(msg);
    });
  });

  console.log(user);
  console.log(chatSpeaker);

  const bottom = useRef<HTMLDivElement>(null);

  const moveToBottom = () => {
    bottom?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    moveToBottom();
  });

  return (
    <div className={chatSpeaker ? 'chat-field' : 'blank-field'}>
      {user && online.includes(user) && <div className="spoiler"></div>}
      {!chatSpeaker && 'To start chat select user from the left panel'}
      {chatSpeaker && (
        <div className="chat-body" ref={bottom}>
          {(storage || chatSpeaker) &&
            state.map((message) => {
              return <ChatMessage key={state.indexOf(message)} mail={message} />;
            })}
        </div>
      )}
    </div>
  );
});
