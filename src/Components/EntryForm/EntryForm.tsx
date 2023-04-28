import React, { ChangeEvent, useState } from 'react';
import './EntryFormStyles.scss';

interface IProps {
    setProps: React.Dispatch<React.SetStateAction<boolean>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
};


export const EntryForm: React.FC<IProps>  = ({ setProps, setName }) => {
  const [state, setState] = useState(true);
  const [data, setData] = useState('');

  if (!state) {
    return null;
  }

  const handleSubmit = () => {
    setState(false);
    setProps(true);
    setName(data);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" onChange={handleInput} className="form-field username-input"></input>
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
