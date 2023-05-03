import React from 'react';
import './ChatField.scss';

interface IChatField {
  storage: string;
}

export const ChatField: React.FC<IChatField> = ({ storage }) => {
  const have = JSON.parse(localStorage.getItem('stack') || '[]');
  return (
    <div>
      {(storage || !storage) &&
        have.map((message: string) => {
          return <p key={have.indexOf(message)}>{message}</p>;
        })}
    </div>
  );
};
