import { createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { FriendsPageUser, UserSliceState, Status } from './types';
import { apiSlice } from '../apiSlice';




const initialState: UserSliceState = {
  users: [0, 0, [] as FriendsPageUser[]],
  sortedUsers: [],
  categorySort: 'people',
  sortBy: '',
  status: Status.LOADING,
};

const friendsPageSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSortedUsers: (state, action) => {
      state.sortedUsers = action.payload;
    },
    setCatergorySort: (state, action) => {
      state.categorySort = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setClearUsers: (state) => {
      state.users = [0, 0, []];
    },
    setStatus: (state) => {
      state.status = Status.LOADING;
    },
  },
});


export const { setCatergorySort, setClearUsers, setSortedUsers, setSortBy } = friendsPageSlice.actions;
export const friendsPageReducer = friendsPageSlice.reducer;
