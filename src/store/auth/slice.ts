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
    setAuthorizedUser: (state, action) => {
      state.authorizedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApiSlice.endpoints.getRefresh.matchFulfilled, (state, { payload }) => {
      state.authorizedUser = payload.user;
      localStorage.setItem('token', payload.data?.accessToken);
    });

    builder.addMatcher(authApiSlice.endpoints.postLogin.matchFulfilled, (state, { payload }) => {
      state.authorizedUser = payload.user;
    });
    builder.addMatcher(authApiSlice.endpoints.postLogin.matchRejected, (state, { payload }) => {
      state.error = payload;
    });

    builder.addMatcher(authApiSlice.endpoints.postRegistration.matchFulfilled, (state, { payload }) => {
      state.authorizedUser = payload.user;
    });
    builder.addMatcher(authApiSlice.endpoints.postLogout.matchPending, (state) => {
      state.authorizedUser = {} as User;
    });
  },
});

export const selectIsAuth = (state: RootState) => state.auth.authorizedUser?._id !== undefined;

export const { setAuthorizedUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
