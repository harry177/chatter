import React from 'react';
import './ChatMessage.styles.scss';
interface IChatMessage {
  mail: {
    hero: string;
    comment: string;
  };
}

export const ChatMessage: React.FC<IChatMessage> = ({ mail }) => {
  const user = localStorage.getItem('user');
  return (
    <div className={mail.hero === user ? 'chat-item__hero' : 'chat-item__npc'}>
      <div className="chat-message__container">
        <div className="chat-message__image" />
        <div className="chat-message">
          <div className="chat-message__header">{mail.hero}</div>
          <div>{mail.comment}</div>
        </div>
      </div>
    </div>
  );
};
