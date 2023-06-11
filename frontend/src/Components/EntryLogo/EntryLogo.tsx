import React from 'react';
import './EntryLogo.styles.scss';

interface ILogo {
  param: string;
}

export const EntryLogo: React.FC<ILogo> = ({ param }) => {
  if (param) return null;
  return <div className="entry-logo">Chatter</div>;
};
