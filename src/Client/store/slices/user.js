import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../tryBack/axios.js';

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  const { data } = await axios.get('/user/all');
  return data;
});

export const fetchUserUpdate = createAsyncThunk('user/id/fetchUserUpdate', async (params, id) => {
  const { data } = await axios.patch(`/user/${id}`, params);

  return data;
});

const initialState = {
  users: null,
  status: 'loading',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },

  extraReducers: {
    [fetchAllUsers.pending]: (state) => {
      state.status = 'loading';
      state.users = null;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.users = action.payload;
    },
    [fetchAllUsers.rejected]: (state) => {
      state.status = 'error';
      state.users = null;
    },

  }
});

export const userReducer = userSlice.reducer;
