import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FriendsPageUser, UserSliceState, Status } from './types';
import axios from '../../backend/axios';

export const fetchUsersPagination = createAsyncThunk(
  'user/pagination/fetchUsersPagination',
  async (pagination: number) => {
    const { data } = await axios.get(`/user/pagination/${pagination}`);
    return data;
  },
);

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
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsersPagination.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUsersPagination.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.users = action.payload;
    });
    builder.addCase(fetchUsersPagination.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setCatergorySort, setClearUsers, setSortedUsers, setSortBy } = friendsPageSlice.actions;
export const friendsPageReducer = friendsPageSlice.reducer;
