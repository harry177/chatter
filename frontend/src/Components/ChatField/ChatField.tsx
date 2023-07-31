import React, { memo, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './ChatField.styles.scss';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { socket } from '../../socket';
import { SelectedUser } from '../SelectedUser/SelectedUser';

interface IChatField {
  storage: string;
  chatSpeaker: string;
  online: string[];
  user: string;
}

interface IMessage {
  hero: string;
  comment: string;
}

export const ChatField: React.FC<IChatField> = memo(({ storage, chatSpeaker, online, user }) => {
  const [state, setState] = useState<IMessage[]>([]);
  const [chatter, setChatter] = useState('');

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });

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
      if (state !== msg) {
        setState(msg);
      }
    });
  }, [state]);

  const bottom = useRef<HTMLDivElement>(null);

  const moveToBottom = () => {
    bottom?.current?.scrollIntoView({ behavior: 'instant', block: 'end' });
  };

  const moveToBottomSmoothly = () => {
    bottom?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    moveToBottom();
  }, [chatSpeaker]);

  useEffect(() => {
    moveToBottomSmoothly();
  }, [state]);

  console.log(user);

  return (
    <div className="general-field">
      <div className={chatSpeaker ? 'chat-field' : 'blank-field'}>
        {!chatSpeaker && !isTabletOrMobile
          ? 'To start chat select user from the left panel'
          : !chatSpeaker && isTabletOrMobile
          ? 'To start chat click "Show users" above and select user'
          : ''}
        {chatSpeaker && (
          <>
            <SelectedUser chat={chatSpeaker} online={online} />
            <div className="chat-body" ref={bottom}>
              {(storage || chatSpeaker) &&
                state.map((message) => {
                  return (
                    <ChatMessage
                      key={state.indexOf(message)}
                      mail={message}
                      online={online}
                      user={user}
                    />
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
});
