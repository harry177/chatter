import React from 'react';
import './ChatButton.styles.scss';

interface IChatButton {
  buttonType: 'button' | 'submit' | 'reset' | undefined;
  buttonText: string;
  clickFunction?: () => void;
}

export const ChatButton: React.FC<IChatButton> = ({ buttonType, buttonText, clickFunction }) => {
  return (
    <button type={buttonType} onClick={clickFunction} className="chat-button">
      {buttonText}
    </button>
  );
};
