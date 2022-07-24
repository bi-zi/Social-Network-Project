import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../tryBack/axios.js';

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  const { data } = await axios.get('/user/all');
  return data;
});

export const fetchOneUser = createAsyncThunk('user/one/id/fetchUserUpdate', async ( id) => {
  const { data } = await axios.get(`/user/one/${id}`);

  return data;
});

export const fetchUserUpdate = createAsyncThunk('user/id/fetchUserUpdate', async (params, id) => {
  const { data } = await axios.patch(`/user/${id}`, params);

  return data;
});

const initialState = {
  usersAll: [],
  userOne: {},
  inputNumber: '',
  status: 'loading',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInputNumber: (state, action) => {
      state.inputNumber = action.payload
    },
  },

  extraReducers: {
    [fetchAllUsers.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.usersAll = action.payload;
    },
    [fetchAllUsers.rejected]: (state) => {
      state.status = 'error';
    },

    [fetchOneUser.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchOneUser.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.userOne = action.payload;
    },
    [fetchOneUser.rejected]: (state) => {
      state.status = 'error';
    },

  }
});

export const { setInputNumber } = userSlice.actions
export const userReducer = userSlice.reducer;
