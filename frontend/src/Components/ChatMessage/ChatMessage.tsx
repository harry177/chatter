import React from 'react';
import { useAppSelector } from '../../app/hooks';
import './ChatMessage.styles.scss';
import '../../App.scss';
interface IChatMessage {
  mail: {
    hero: string;
    comment: string;
  };
  online: string[];
}

export const ChatMessage: React.FC<IChatMessage> = ({ mail, online }) => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className={mail.hero === user ? 'chat-item__hero' : 'chat-item__npc'}>
      <div
        className={
          mail.hero === user ? 'chat-message__container-right' : 'chat-message__container-left'
        }
      >
        <div
          className={online.includes(mail.hero) ? 'main-user__image-active' : 'main-user__image'}
        />
        <div className="chat-message">
          <div className="chat-message__header">{mail.hero}</div>
          <div className="chat-message__body">{mail.comment}</div>
        </div>
      </div>
    </div>
  );
};
