import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from 'features/slices/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});
