import React from 'react';
import './FormButton.styles.scss';

interface IFormButton {
  buttonType: 'button' | 'submit' | 'reset' | undefined;
  buttonText: string;
  clickFunction?: () => void;
}

export const FormButton: React.FC<IFormButton> = ({ buttonType, buttonText, clickFunction }) => {
  return (
    <button type={buttonType} onClick={clickFunction} className="form-button">
      {buttonText}
    </button>
  );
};
