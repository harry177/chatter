import React from 'react';
import './Header.styles.scss';

interface IUser {
  user: string;
}

export const Header: React.FC<IUser> = ({ user }) => {
  if (user) return <header className="header">Welcome {user}</header>;
  return <header className="header">Welcome to Chatter app!</header>;
};
