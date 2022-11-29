import { createSlice } from '@reduxjs/toolkit';
import { AuthSliceState } from './types';

const initialState: AuthSliceState = {
  status: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;
export const authReducer = authSlice.reducer;
