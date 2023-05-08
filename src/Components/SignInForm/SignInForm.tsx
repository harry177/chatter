import React, { ChangeEvent, useState } from 'react';
import './SignInFormStyles.scss';

interface IProps {
  setProps: React.Dispatch<React.SetStateAction<string>>;
  dispatchBack: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignInForm: React.FC<IProps> = ({ setProps, dispatchBack }) => {
  const isUser: string | null = localStorage.getItem('user') || '';

  const [state, setState] = useState(isUser);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [back, setBack] = useState(true);

  const handleSubmit = () => {
    setState('Artem');
    setProps('artem');
    checkUser();
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const handleBack = () => {
    setBack(false);
    dispatchBack(true);
  };

  async function checkUser() {
    const response = await fetch('http://localhost:3000/api/users:email', {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    });
    if (response.ok === true) {
      const user = await response.json();
      console.log(user);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        onChange={handleEmail}
        className="form-field email-input"
      ></input>
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        onChange={handlePass}
        className="form-field password-input"
      ></input>
      <button type="submit" className="submit-button">
        Submit
      </button>
      <button onClick={handleBack}>Move to SignUp</button>
    </form>
  );
};
