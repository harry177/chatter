import React from 'react';
import './ChatMessage.styles.scss';
import '../../App.scss';
interface IChatMessage {
  mail: {
    hero: string;
    comment: string;
  };
  online: string[];
  user: string;
}

export const ChatMessage: React.FC<IChatMessage> = ({ mail, online, user }) => {
  //const user = localStorage.getItem('user');
  return (
    <div className={mail.hero === user ? 'chat-item__hero' : 'chat-item__npc'}>
      <div className="chat-message__container">
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
