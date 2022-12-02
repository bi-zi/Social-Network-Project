import { createSlice } from '@reduxjs/toolkit';
import { UserSliceState, MainUser } from './types';
import { userApiSlice } from './userApi';

const initialState: UserSliceState = {
  mainUser: {} as MainUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // builder.addMatcher(userApiSlice.endpoints.getRefresh.matchFulfilled, (state, { payload }) => {
    //   state.authorizedUser = payload.user;
    //   localStorage.setItem('token', payload.data?.accessToken);
    // });
  },
});



export const {  } = userSlice.actions;
export const userReducer = userSlice.reducer;
