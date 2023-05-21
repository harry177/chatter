import React from 'react';
import './ChatUsersStyles.scss';

interface IUser {
  user: string;
}

export const ChatUsers: React.FC<IUser> = ({ user }) => {
  return <div className="chat-users">{user}</div>;
};
