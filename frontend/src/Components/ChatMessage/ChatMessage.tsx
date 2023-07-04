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
    <div className={mail.hero === user ? 'chat-item__hero' : 'chat-item__npc'}>{mail.comment}</div>
  );
};
