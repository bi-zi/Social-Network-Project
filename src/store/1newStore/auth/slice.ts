import { createSlice } from '@reduxjs/toolkit';
import { UserSliceState, Registration } from './types';
import { RootState } from '../../store';
import { extendedApiSlice } from './authApi';

const initialState: UserSliceState = {
  authorizedUser: {} as Registration,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizedUser: (state, action) => {
      state.authorizedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(extendedApiSlice.endpoints.postLogin.matchFulfilled, (state, { payload }) => {
      state.authorizedUser = payload.user;
    });
    builder.addMatcher(
      extendedApiSlice.endpoints.postRegistration.matchFulfilled,
      (state, { payload }) => {
        state.authorizedUser = payload.user;
      },
    );
    builder.addMatcher(extendedApiSlice.endpoints.postLogout.matchPending, (state) => {
      state.authorizedUser = {} as Registration;
    });
  },
});

export const selectIsAuth = (state: RootState) => state.secondAuth.authorizedUser?._id !== undefined;

export const { setAuthorizedUser } = authSlice.actions;
export const secondAuthReducer = authSlice.reducer;
