import React, { useState } from 'react';
import './SignInFormStyles.scss';

interface IProps {
  setProps: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignInForm: React.FC<IProps> = ({ setProps }) => {
  const [state, setState] = useState(true);

  if (!state) {
    return null;
  }

  const handleSubmit = () => {
    setState(false);
    setProps(true);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" className="form-field email-input"></input>
      <label htmlFor="password">Password</label>
      <input type="text" id="password" className="form-field password-input"></input>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};
