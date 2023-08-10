import React from 'react';
import './ChatButton.styles.scss';

interface IChatButton {
  buttonType: 'button' | 'submit' | 'reset' | undefined;
  buttonText: string;
  clickFunction?: () => void;
  style?: string;
}

export const ChatButton: React.FC<IChatButton> = ({
  buttonType,
  buttonText,
  clickFunction,
  style,
}) => {
  return (
    <button
      type={buttonType}
      onClick={clickFunction}
      className="chat-button"
      style={{ marginRight: style }}
    >
      {buttonText}
    </button>
  );
};
