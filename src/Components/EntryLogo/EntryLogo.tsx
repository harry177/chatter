import React from 'react';
import './EntryLogoStyles.scss';

interface ILogo {
  param: boolean;
}

export const EntryLogo: React.FC<ILogo> = ({ param }) => {
  if (param) return null;
  return <div className="entry-logo">Chatter</div>;
};
