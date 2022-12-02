import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Messages, MessagesSliceState, Status } from './types';
import axios from '../../../backend/axios';

export const fetchMainUserMessages = createAsyncThunk(
  'messages/id/fetchMainUserMessages',
  async (id: string) => {
    const { data } = await axios.get(`/messages/${id}`);
    return data;
  },
);

export const fetchSecondUserMessages = createAsyncThunk(
  'messages/user/fetchSecondUserMessages',
  async (id: string) => {
    const { data } = await axios.get(`/messages/user/${id}`);
    return data;
  },
);

export const fetchCreateMessages = createAsyncThunk<Messages, { withWho: string; user: string }>(
  'messages/createMessages/fetchCreateMessages',
  async ({ withWho, user }: { withWho: string; user: string }) => {
    const { data } = await axios.post('/messages/createMessages', { withWho, user });
    return data;
  },
);

export const fetchCreateChat = createAsyncThunk<Messages, { withWho: string; user: string }>(
  'about/pushChat/fetchCreateChat',
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
  mainUserMessages: [],
  secondUserMessages: [],
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
    builder.addCase(fetchMainUserMessages.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchMainUserMessages.fulfilled, (state, action) => {
      state.mainUserMessages = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchMainUserMessages.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchSecondUserMessages.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchSecondUserMessages.fulfilled, (state, action) => {
      state.secondUserMessages = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchSecondUserMessages.rejected, (state) => {
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

    builder.addCase(fetchCreateChat.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchCreateChat.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCreateChat.rejected, (state) => {
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
