import React from 'react';
import './HeaderStyles.scss';

interface IUser {
  user: string;
}

export const Header: React.FC<IUser> = ({ user }) => {
  if (user) return <div className="header">Welcome {user}</div>;
  return <div className="header">Welcome to Chatter app!</div>;
};
