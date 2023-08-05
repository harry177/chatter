import React from 'react';
import { ChatButton } from '../ChatButton/ChatButton';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toggleUser } from '../../features/slices/userSlice';
import './MainUser.styles.scss';
import '../../App.scss';

export const MainUser = () => {
  const user = useAppSelector((state) => state.user.user);
  const updateUser = useAppDispatch();

  return (
    <div className="main-user">
      <div className={user ? 'main-user__image-active' : 'main-user__image'} />
      <div className="main-user__info">
        <div>{user}</div>
      </div>
      <ChatButton
        buttonType="button"
        buttonText="Exit"
        clickFunction={() => updateUser(toggleUser(''))}
        style={'30px'}
      />
    </div>
  );
};
