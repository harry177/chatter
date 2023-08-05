import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: { user: string } = {
  user: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  },
});

export const { toggleUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
