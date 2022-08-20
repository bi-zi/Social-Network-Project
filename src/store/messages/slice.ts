import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Messages, MessagesSliceState, Status } from './types';
import axios from '../../backend/axios.js';

export const fetchGetMessages = createAsyncThunk<Messages[]>('messages/all/fetchGetMessages', async () => {
  const { data } = await axios.get(`/messages/all`);
  return data;
});

export const fetchCreateMessages = createAsyncThunk<Messages[]>(
  'messages/createMessages/fetchCreateMessages',
  async (params) => {
    const { data } = await axios.post('/messages/createMessages', params);
    return data;
  },
);

export const fetchPushChat = createAsyncThunk<Messages[]>('about/pushChat/fetchPushChat', async (params) => {
  const { data } = await axios.patch(`/messages/pushChat`, params);
  return data;
});

export const fetchAddMessage = createAsyncThunk<Messages[]>(
  'about/addMessage/fetchAddMessage',
  async (params) => {
    const { data } = await axios.patch(`/messages/addMessage`, params);
    return data;
  },
);

const initialState: MessagesSliceState = {
  data: [],
  sortedId: '',
  status: Status.LOADING,
};

const messagesSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setSortedId: (state, action) => {
      state.sortedId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetMessages.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchGetMessages.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchGetMessages.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchCreateMessages.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchCreateMessages.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCreateMessages.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchPushChat.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPushChat.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPushChat.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchAddMessage.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAddMessage.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchAddMessage.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setSortedId } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
