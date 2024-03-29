import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { socket } from '../../socket';
import { SelectedUser } from '../SelectedUser/SelectedUser';
import { useAppSelector } from '../../app/hooks';
import './ChatField.styles.scss';

interface IChatField {
  storage: string;
  chatSpeaker: string;
  online: string[];
}

interface IMessage {
  hero: string;
  comment: string;
}

export const ChatField: React.FC<IChatField> = ({ storage, chatSpeaker, online }) => {
  const user = useAppSelector((state) => state.user.user);
  const [state, setState] = useState<IMessage[]>([]);
  const [chatter, setChatter] = useState('');

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    if (user && chatSpeaker) {
      const room = [user, chatSpeaker].sort((a, b) => (a < b ? -1 : 1)).join('');
      socket.emit('joinRoom', { user, speaker: chatSpeaker, formerSpeaker: chatter, room });
      setChatter(chatSpeaker);
    } else {
      setChatter('');
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
      if (msg) {
        setState(msg);
      }
    });
  }, []);

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
                    <ChatMessage key={state.indexOf(message)} mail={message} online={online} />
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
