import { createSlice } from '@reduxjs/toolkit';
import { UserSliceState, MainUser } from './types';
import { userApiSlice } from './userApi';

const initialState: UserSliceState = {
  user: {} as MainUser,
};

const mainUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state) => {
      state.user = {} as MainUser;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApiSlice.endpoints.getMainUser.matchFulfilled, (state, { payload }) => {
      state.user = payload;
      console.log(payload)
    });
    builder.addMatcher(userApiSlice.endpoints.getMainUser.matchRejected, (state, { payload }) => {
      console.log('rejected');
    });
      builder.addMatcher(userApiSlice.endpoints.getMainUser.matchPending, (state, { payload }) => {
        console.log('----');
      });
  },
});

export const { setUser } = mainUserSlice.actions;
export const mainUserReducer = mainUserSlice.reducer;
