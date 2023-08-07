import React, { ChangeEvent, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { SignUpPopover } from '../SignUpPopover/SignUpPopover';
import { FormButton } from '../FormButton/FormButton';
import { useAppDispatch } from '../../app/hooks';
import { toggleUser } from '../../features/slices/userSlice';
import './SignUpForm.styles.scss';

interface IProps {
  dispatchBack: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUpForm: React.FC<IProps> = ({ dispatchBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState(false);

  const [isEmail, setIsEmail] = useState('');
  const [isName, setIsName] = useState('');

  const updateUser = useAppDispatch();

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

  const handleBack = () => {
    dispatchBack(true);
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
    if (user.message === 'User with such name is aready existed') {
      setIsName(user.message);
    }
    if (user.user) {
      updateUser(toggleUser(user.user.name));
      console.log(user.token);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const isMobileLandscape = useMediaQuery({
    query: '(max-width: 950px) and (orientation: landscape)',
  });

  return (
    <form
      className={isMobileLandscape ? 'form-landscape' : 'form'}
      onSubmit={handleSubmit(handleForm)}
    >
      <label htmlFor="username">Username</label>
      <div className="form-field__elem">
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
        {isName}
      </div>
      <label htmlFor="email">Email</label>
      <div className="form-field__elem">
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
      </div>
      <label htmlFor="password">Password</label>
      <div className="form-field__elem">
        <input
          type="password"
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
      </div>
      <label htmlFor="confirm">Confirmation</label>
      <div className="form-field__elem">
        <div className="form-confirm">
          <input
            type="checkbox"
            id="confirm"
            {...register('confirmLabel', { required: true })}
            onChange={handleConfirm}
            className="confirm-input"
          ></input>
          <SignUpPopover />
        </div>
        {errors?.confirmLabel?.type === 'required' && (
          <span>The field cannot be empty. To enter, you should read and approve conditions</span>
        )}
      </div>
      <div className="form-buttons">
        <FormButton buttonType="submit" buttonText="Submit" />
        <FormButton buttonType="button" buttonText="Move to login" clickFunction={handleBack} />
      </div>
    </form>
  );
};
