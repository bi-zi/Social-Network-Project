import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../tryBack/axios.js';

export const fetchGetMessages = createAsyncThunk('messages/all/fetchGetMessages', async () => {
  const { data } = await axios.get(`/messages/all`);
  return data;
});

export const fetchCreateMessages = createAsyncThunk('messages/createMessages/fetchCreateMessages', async (params) => {
  const { data } = await axios.post('/messages/createMessages', params);
  return data;
});

export const fetchPushChat = createAsyncThunk('about/pushChat/fetchPushChat', async (params) => {
  const { data } = await axios.patch(`/messages/pushChat`, params);
  return data;
});

export const fetchAddMessage = createAsyncThunk('about/addMessage/fetchAddMessage', async (params) => {
  const { data } = await axios.patch(`/messages/addMessage`, params);
  return data;
});

const initialState = {
  data: [],
  status: 'loading',
};

const messagesSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: {

    [fetchGetMessages.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchGetMessages.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = 'loaded';
    },
    [fetchGetMessages.rejected]: (state) => {
      state.status = 'error';
    },

    [fetchCreateMessages.pending]: (state) => { state.status = 'loading' },
    [fetchCreateMessages.fulfilled]: (state) => {state.status = 'loaded'},
    [fetchCreateMessages.rejected]: (state) => { state.status = 'error' },

    [fetchPushChat.pending]: (state) => { state.status = 'loading' },
    [fetchPushChat.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchPushChat.rejected]: (state) => { state.status = 'error' },

    [fetchAddMessage.pending]: (state) => { state.status = 'loading' },
    [fetchAddMessage.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchAddMessage.rejected]: (state) => { state.status = 'error' },
  },
});

export const messagesReducer = messagesSlice.reducer;
