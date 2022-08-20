import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserSliceState, Status } from './types';
import axios from '../../backend/axios.js';

export const fetchAllUsers = createAsyncThunk<User[]>('user/fetchAllUsers', async () => {
  const { data } = await axios.get('/user/all');
  return data;
});

export const fetchOneUser = createAsyncThunk<User[]>('user/one/id/fetchUserUpdate', async (id) => {
  const { data } = await axios.get(`/user/one/${id}`);

  return data;
});

export const fetchUserUpdate = createAsyncThunk<User[]>(
  'user/id/fetchUserUpdate',
  async (params, id) => {
    const { data } = await axios.patch(`/user/${id}`, params);

    return data;
  },
);

export const fetchSubscribe = createAsyncThunk<User[]>(
  'user/subscribe/id/fetchUserUpdate',
  async (params, id) => {
    const { data } = await axios.patch(`/user/subscribe/${id}`, params);

    return data;
  },
);

export const fetchUnsubscribe = createAsyncThunk<User[]>(
  'user/unsubscribe/id/fetchUnsubscribe',
  async (params, id) => {
    const { data } = await axios.patch(`/user/unsubscribe/${id}`, params);

    return data;
  },
);

export const fetchAcceptFriend = createAsyncThunk<User[]>(
  'user/friend/id/fetchAcceptFriend',
  async (params, id) => {
    const { data } = await axios.patch(`/user/friend/${id}`, params);

    return data;
  },
);

export const fetchDeleteFriend = createAsyncThunk<User[]>(
  'user/deleteFriend/id/fetchDeleteFriend',
  async (params, id) => {
    const { data } = await axios.patch(`/user/deleteFriend/${id}`, params);

    return data;
  },
);

const initialState: UserSliceState = {
  usersAll: [],
  userOne: {},
  inputNumber: '',
  catergory: '',
  status: Status.LOADING,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInputNumber: (state, action) => {
      state.inputNumber = action.payload;
    },
    setCatergory: (state, action) => {
      state.catergory = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.usersAll = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchOneUser.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchOneUser.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.userOne = action.payload;
    });
    builder.addCase(fetchOneUser.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchUserUpdate.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUserUpdate.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUserUpdate.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchSubscribe.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchSubscribe.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchSubscribe.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchUnsubscribe.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUnsubscribe.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUnsubscribe.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchAcceptFriend.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAcceptFriend.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchAcceptFriend.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchDeleteFriend.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchDeleteFriend.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchDeleteFriend.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setInputNumber, setCatergory } = userSlice.actions;
export const userReducer = userSlice.reducer;
