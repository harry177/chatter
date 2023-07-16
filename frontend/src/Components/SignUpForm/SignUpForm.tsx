import React, { ChangeEvent, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { SignUpPopover } from '../SignUpPopover/SignUpPopover';

import './SignUpForm.styles.scss';

interface IProps {
  dispatchName: React.Dispatch<React.SetStateAction<string>>;
  dispatchView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUpForm: React.FC<IProps> = ({ dispatchName, dispatchView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState(false);

  const [isEmail, setIsEmail] = useState('');

  const handleForm: SubmitHandler<FieldValues> = () => {
    createUser();
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

  const handleConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirm(event.target.checked);
  };

  const handleMove = () => {
    dispatchView(false);
  };

  const createUser = async () => {
    const response = await fetch('/api/register', {
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
    if (user.user) {
      dispatchName(user.user.name);
      console.log(user.token);
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
        {...register('nameLabel', { required: true, minLength: 3, maxLength: 12 })}
        onChange={handleName}
        className="form-field username-input"
      ></input>
      {errors?.nameLabel?.type === 'required' && (
        <span>The field cannot be empty. Please, enter your name</span>
      )}
      {errors?.nameLabel?.type === 'minLength' && (
        <span>The length of name must be at least 3 characters long. Try again</span>
      )}
      {errors?.nameLabel?.type === 'maxLength' && (
        <span>The length of name can`t be more than 12 characters long. Try again</span>
      )}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        {...register('emailLabel', { required: true })}
        onChange={handleEmail}
        className="form-field email-input"
      ></input>
      {errors?.emailLabel?.type === 'required' && (
        <span>The field cannot be empty. Please, enter your email</span>
      )}
      {isEmail}
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        {...register('passLabel', { required: true, minLength: 5 })}
        onChange={handlePass}
        className="form-field password-input"
      ></input>
      {errors?.passLabel?.type === 'required' && (
        <span>The field cannot be empty. Please, enter your name</span>
      )}
      {errors?.passLabel?.type === 'minLength' && (
        <span>The length of name must be at least 5 characters long. Try again</span>
      )}
      <label htmlFor="confirm">Confirmation</label>
      <div className="form-confirm">
        <input
          type="checkbox"
          id="confirm"
          {...register('confirmLabel', { required: true })}
          onChange={handleConfirm}
          className={confirm ? 'form-field confirm-active' : 'form-field confirm-input'}
        ></input>
        <SignUpPopover />
      </div>
      {errors?.confirmLabel?.type === 'required' && (
        <span>The field cannot be empty. To enter, you should read and approve conditions</span>
      )}
      <div>
        <button type="submit" className="submit-button">
          Submit
        </button>
        <button onClick={handleMove}>Move to Login</button>
      </div>
    </form>
  );
};
