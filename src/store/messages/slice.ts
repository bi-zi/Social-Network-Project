import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Messages, MessagesSliceState, Status } from './types';
import axios from '../../backend/axios';

export const fetchGetMessages = createAsyncThunk<Messages[]>(
  'messages/all/fetchGetMessages',
  async () => {
    const { data } = await axios.get(`/messages/all`);
    return data;
  },
);

export const fetchCreateMessages = createAsyncThunk<Messages[], { withWho: string; user: string }>(
  'messages/createMessages/fetchCreateMessages',
  async ({ withWho, user }: { withWho: string; user: string }) => {
    const { data } = await axios.post('/messages/createMessages', { withWho, user });
    return data;
  },
);

export const fetchPushChat = createAsyncThunk<Messages[], { withWho: string; user: string }>(
  'about/pushChat/fetchPushChat',
  async ({ withWho, user }: { withWho: string; user: string }) => {
    const { data } = await axios.patch(`/messages/pushChat`, { withWho, user });
    return data;
  },
);

export const fetchAddMessage = createAsyncThunk<
  Messages[],
  { message: string; userId: string; withWho: string; user: string; yourIndex: string; hisIndex: string }
>(
  'about/addMessage/fetchAddMessage',
  async ({
    message,
    userId,
    withWho,
    user,
    yourIndex,
    hisIndex,
  }: {
    message: string;
    userId: string;
    withWho: string;
    user: string;
    yourIndex: string;
    hisIndex: string;
  }) => {
    const { data } = await axios.patch(`/messages/addMessage`, {
      message,
      userId,
      withWho,
      user,
      yourIndex,
      hisIndex,
    });
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
