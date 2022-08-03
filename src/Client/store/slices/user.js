import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../tryBack/axios.js';

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  const { data } = await axios.get('/user/all');
  return data;
});

export const fetchOneUser = createAsyncThunk('user/one/id/fetchUserUpdate', async (id) => {
  const { data } = await axios.get(`/user/one/${id}`);

  return data;
});

export const fetchUserUpdate = createAsyncThunk('user/id/fetchUserUpdate', async (params, id) => {
  const { data } = await axios.patch(`/user/${id}`, params);

  return data;
});

export const fetchSubscribe = createAsyncThunk('user/subscribe/id/fetchUserUpdate', async (params, id) => {
  const { data } = await axios.patch(`/user/subscribe/${id}`, params);

  return data;
});

export const fetchUnsubscribe = createAsyncThunk('user/unsubscribe/id/fetchUnsubscribe', async (params, id) => {
  const { data } = await axios.patch(`/user/unsubscribe/${id}`, params);

  return data;
});

export const fetchAcceptFriend = createAsyncThunk('user/friend/id/fetchAcceptFriend', async (params, id) => {
  const { data } = await axios.patch(`/user/friend/${id}`, params);

  return data;
});

export const fetchDeleteFriend = createAsyncThunk('user/deleteFriend/id/fetchDeleteFriend', async (params, id) => {
  const { data } = await axios.patch(`/user/deleteFriend/${id}`, params);

  return data;
});

const initialState = {
  usersAll: [],
  userOne: {},
  data: {},
  inputNumber: '',
  catergory: '',
  status: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInputNumber: (state, action) => {
      state.inputNumber = action.payload
    },
    setCatergory: (state, action) => {
      state.catergory = action.payload
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

    [fetchUserUpdate.pending]: (state) => { state.status = 'loading' },
    [fetchUserUpdate.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchUserUpdate.rejected]: (state) => { state.status = 'error' },

    [fetchSubscribe.pending]: (state) => { state.status = 'loading' },
    [fetchSubscribe.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchSubscribe.rejected]: (state) => { state.status = 'error' },

    [fetchUnsubscribe.pending]: (state) => { state.status = 'loading' },
    [fetchUnsubscribe.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchUnsubscribe.rejected]: (state) => { state.status = 'error' },

    [fetchAcceptFriend.pending]: (state) => { state.status = 'loading' },
    [fetchAcceptFriend.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchAcceptFriend.rejected]: (state) => { state.status = 'error' },

    [fetchDeleteFriend.pending]: (state) => { state.status = 'loading' },
    [fetchDeleteFriend.fulfilled]: (state) => {state.status = 'loaded'},
    [fetchDeleteFriend.rejected]: (state) => { state.status = 'error' },
  }
});

export const { setInputNumber, setCatergory } = userSlice.actions
export const userReducer = userSlice.reducer;
