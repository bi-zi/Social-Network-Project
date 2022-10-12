import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Messages, MessagesSliceState, Status } from './types';
import axios from '../../Backend/axios';

export const fetchGetMessages = createAsyncThunk('messages/id/fetchGetMessages', async (id: string) => {
  const { data } = await axios.get(`/messages/${id}`);
  return data;
});

export const fetchChatUser = createAsyncThunk('messages/i1/fetchGetMessages', async (id: string) => {
  const { data } = await axios.get(`/messages/${id}`);
  return data;
});

export const fetchCreateMessages = createAsyncThunk<Messages, { withWho: string; user: string }>(
  'messages/createMessages/fetchCreateMessages',
  async ({ withWho, user }: { withWho: string; user: string }) => {
    const { data } = await axios.post('/messages/createMessages', { withWho, user });
    return data;
  },
);

export const fetchPushChat = createAsyncThunk<Messages, { withWho: string; user: string }>(
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
  userMessages: [],
  data2: [],
  selectedUser: localStorage.selectedUser === undefined ? '' : localStorage.selectedUser,
  addMessages: 40,
  findChat: '',
  sortedChats: [],
  status: Status.LOADING,
};

const messagesSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setAddMessages: (state, action) => {
      state.addMessages = action.payload;
    },
    setFindChat: (state, action) => {
      state.findChat = action.payload;
    },
    setSortedChats: (state, action) => {
      state.sortedChats = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGetMessages.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchGetMessages.fulfilled, (state, action) => {
      state.userMessages = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchGetMessages.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchChatUser.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchChatUser.fulfilled, (state, action) => {
      state.data2 = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchChatUser.rejected, (state) => {
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

export const { setSelectedUser, setAddMessages, setFindChat, setSortedChats } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
