import { createSlice } from '@reduxjs/toolkit';
import { UserSliceState, Registration } from './types';

const initialState: UserSliceState = {
  mainUser: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMainUser: (state, action) => {
      state.mainUser = action.payload
    }
  },
});

export const { setMainUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
