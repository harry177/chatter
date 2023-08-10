import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { ChatButton } from '../ChatButton/ChatButton';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toggleUser } from '../../features/slices/userSlice';
import './MainUser.styles.scss';
import '../../App.scss';

export const MainUser = () => {
  const user = useAppSelector((state) => state.user.user);
  const updateUser = useAppDispatch();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });

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
        style={isTabletOrMobile ? '15px' : '10px'}
      />
    </div>
  );
};
