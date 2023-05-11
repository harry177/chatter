import React, { ChangeEvent, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import './SignUpFormStyles.scss';

interface IProps {
  dispatchName: React.Dispatch<React.SetStateAction<string>>;
  dispatchView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUpForm: React.FC<IProps> = ({ dispatchName, dispatchView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [isEmail, setIsEmail] = useState('');
  //const [isPassword, setIsPassword] = useState('');

  const handleForm: SubmitHandler<FieldValues> = () => {
    //event.preventDefault();
    createUser();
    //return null;
  };

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const handleMove = () => {
    dispatchView(false);
  };

  const createUser = async () => {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: pass,
      }),
    });
    const user = await response.json();
    if (user.message === 'User with such email is aready existed') {
      setIsEmail(user.message);
    }
    if (user.name) {
      dispatchName(user.name);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form className="form" onSubmit={handleSubmit(handleForm)}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        {...register('nameLabel', { required: true, minLength: 3 })}
        onChange={handleName}
        className="form-field username-input"
      ></input>
      <div>
        {errors?.nameLabel?.type === 'required' && (
          <p>The field cannot be empty. Please, enter your name</p>
        )}
        {errors?.nameLabel?.type === 'minLength' && (
          <p>The length of name must be at least 3 characters long. Try again</p>
        )}
      </div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        {...register('emailLabel', { required: true })}
        onChange={handleEmail}
        className="form-field email-input"
      ></input>
      <div>
        {errors?.emailLabel?.type === 'required' && (
          <p>The field cannot be empty. Please, enter your name</p>
        )}
      </div>
      {isEmail}
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        {...register('passLabel', { required: true, minLength: 5 })}
        onChange={handlePass}
        className="form-field password-input"
      ></input>
      <div>
        {errors?.passLabel?.type === 'required' && (
          <p>The field cannot be empty. Please, enter your name</p>
        )}
        {errors?.passLabel?.type === 'minLength' && (
          <p>The length of name must be at least 5 characters long. Try again</p>
        )}
      </div>
      <label htmlFor="confirm">Confirmation</label>
      <input type="checkbox" id="confirm" className="form-field confirm-input"></input>
      <button type="submit" className="submit-button">
        Submit
      </button>
      <button onClick={handleMove}>Move to Login</button>
    </form>
  );
};
