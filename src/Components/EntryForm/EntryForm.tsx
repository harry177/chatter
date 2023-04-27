import React, { useState } from 'react';
import './EntryFormStyles.scss';

interface IProps {
    setProps: React.Dispatch<React.SetStateAction<boolean>>;
};


export const EntryForm: React.FC<IProps>  = ({ setProps }) => {
  const [state, setState] = useState(true);

  if (!state) {
    const props: boolean = false;
    return null;
  }

  const handleSubmit = () => {
    setState(false);
    setProps(true);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" className="form-field username-input"></input>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" className="form-field email-input"></input>
      <label htmlFor="password">Password</label>
      <input type="text" id="password" className="form-field password-input"></input>
      <label htmlFor="email">Confirmation</label>
      <input type="checkbox" id="confirm" className="form-field confirm-input"></input>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};
