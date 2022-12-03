import { createSlice } from '@reduxjs/toolkit';
import { AuthSliceState, User, Error } from './types';
import { RootState } from '../store';
import { authApiSlice } from './authApi';

const initialState: AuthSliceState = {
  authorizedUser: {} as User,
  error: {} as any,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addMatcher(authApiSlice.endpoints.getRefresh.matchFulfilled, (state, { payload }) => {
      state.authorizedUser = payload.user;
      localStorage.setItem('token', payload.accessToken);
      console.log(1);
    });

    builder.addMatcher(authApiSlice.endpoints.getRefresh.matchRejected, (state, { payload }) => {
      state.error = payload;
      console.log(2);
    });


    builder.addMatcher(authApiSlice.endpoints.postLogin.matchFulfilled, (state, { payload }) => {
      state.authorizedUser = payload.user;
      localStorage.setItem('token', payload.accessToken);
      console.log(3);
    });
    builder.addMatcher(authApiSlice.endpoints.postLogin.matchRejected, (state, { payload }) => {
      state.error = payload;
      console.log(4);
    });

    builder.addMatcher(authApiSlice.endpoints.postRegistration.matchFulfilled, (state, { payload }) => {
      state.authorizedUser = payload.user;
       localStorage.setItem('token', payload.accessToken);
      console.log(5);
    });
    builder.addMatcher(authApiSlice.endpoints.postLogout.matchPending, (state) => {
      state.authorizedUser = {} as User;
      console.log(6);
    });
  },
});

export const selectIsAuth = (state: RootState) => state.auth.authorizedUser?._id !== undefined;

export const {  } = authSlice.actions;
export const authReducer = authSlice.reducer;
