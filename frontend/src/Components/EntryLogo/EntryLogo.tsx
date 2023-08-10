import React from 'react';
import { useAppSelector } from '../../app/hooks';
import './EntryLogo.styles.scss';

export const EntryLogo = () => {
  const user = useAppSelector((state) => state.user.user);
  if (user) return null;
  return <div className="entry-logo">Chatter</div>;
};
