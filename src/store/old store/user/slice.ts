import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserSliceState, Status } from './types';
import axios from '../../../backend/axios';

export const fetchAllUsers = createAsyncThunk<User[]>('user/fetchAllUsers', async () => {
  const { data } = await axios.get('/user/all');
  return data;
});

export const fetchOneUser = createAsyncThunk('user/one/id/fetchUserUpdate', async (id: string) => {
  const { data } = await axios.get<User[]>(`/user/one/${id}`);

  return data;
});

export const fetchMainUser = createAsyncThunk('user/main/id/fetchMainUser', async (id: string) => {
  const { data } = await axios.get<User[]>(`/user/main/${id}`);

  return data;
});

export const fetchUserFriends = createAsyncThunk(
  'user/findFriends/fetchUserFriends',
  async (id: string) => {
    const { data } = await axios.get<User[]>(`/user/findFriends/${id}`);

    return data;
  },
);

export const fetchUserSubscribers = createAsyncThunk(
  'user/findSubscribers/fetchUserSubscribers',
  async (id: string) => {
    const { data } = await axios.get<User[]>(`/user/findSubscribers/${id}`);

    return data;
  },
);

export const fetchUsersForChats = createAsyncThunk('user/fetchUsersForChats', async (users: string) => {
  const { data } = await axios.get(`/user/findChats/${users}}`);

  return data;
});

export const fetchCommentators = createAsyncThunk(
  'user/findCommentators/fetchCommentators',
  async (users: string | undefined) => {
    const { data } = await axios.get(`/user/findCommentators/${users}}`);

    return data;
  },
);

export const fetchUserUpdate = createAsyncThunk<User[], { imageUrl: string | string[]; user: string }>(
  'user/id/fetchUserUpdate',
  async ({ imageUrl, user }: { imageUrl: string | string[]; user: string }) => {
    const { data } = await axios.patch(`/user/${user}`, { imageUrl });

    return data;
  },
);

export const fetchSubscribe = createAsyncThunk<User[], { authUserId: string; id: string; user: string }>(
  'user/subscribe/id/fetchUserUpdate',
  async ({ authUserId, id, user }: { authUserId: string; id: string; user: string }) => {
    const { data } = await axios.patch(`/user/subscribe/${user}`, { authUserId, id });

    return data;
  },
);

export const fetchUnsubscribe = createAsyncThunk<User[], { id: string; index: number; user: string }>(
  'user/unsubscribe/id/fetchUnsubscribe',
  async ({ id, index, user }: { id: string; index: number; user: string }) => {
    const { data } = await axios.patch(`/user/unsubscribe/${user}`, { id, index });

    return data;
  },
);

export const fetchAcceptFriend = createAsyncThunk<User[], { id: string; index: number; user: string }>(
  'user/friend/id/fetchAcceptFriend',
  async ({ id, index, user }: { id: string; index: number; user: string }) => {
    const { data } = await axios.patch(`/user/friend/${user}`, { id, index });

    return data;
  },
);

export const fetchDeleteFriend = createAsyncThunk<
  User[],
  { id: string; index: number; index2: number; user: string }
>(
  'user/deleteFriend/id/fetchDeleteFriend',
  async ({ id, index, index2, user }: { id: string; index: number; index2: number; user: string }) => {
    const { data } = await axios.patch(`/user/deleteFriend/${user}`, { id, index, index2 });

    return data;
  },
);

const initialState: UserSliceState = {
  usersAll: [],
  userOne: [],
  mainUser: {} as User,

  findUserFriends: [],
  findUserSubscribers: [],

  chatUsers: [],

  commentators: [],

  inputNumber: '',
  deleteAttention: 0,
  status: Status.LOADING,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInputNumber: (state, action) => {
      state.inputNumber = action.payload;
    },

    setAttention: (state, action) => {
      state.deleteAttention = action.payload;
    },

    setClearFindUserFriends: (state) => {
      state.findUserFriends = [];
    },
    setClearFindUserSubscribers: (state) => {
      state.findUserSubscribers = [];
    },

    setClearCommentators: (state) => {
      state.commentators = [];
    },
  },

  extraReducers: (builder) => {
    // builder.addCase(fetchAllUsers.pending, (state) => {
    //   state.status = Status.LOADING;
    // });
    // builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
    //   state.status = Status.SUCCESS;
    //   state.playersAll = action.payload;
    // });
    // builder.addCase(fetchAllUsers.rejected, (state) => {
    //   state.status = Status.ERROR;
    // });

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

    builder.addCase(fetchMainUser.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchMainUser.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.mainUser = action.payload[0];
    });
    builder.addCase(fetchMainUser.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchUserFriends.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUserFriends.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.findUserFriends = action.payload;
    });
    builder.addCase(fetchUserFriends.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchUserSubscribers.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUserSubscribers.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.findUserSubscribers = action.payload;
    });
    builder.addCase(fetchUserSubscribers.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchUsersForChats.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUsersForChats.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.chatUsers = action.payload;
    });
    builder.addCase(fetchUsersForChats.rejected, (state) => {
      state.status = Status.ERROR;
    });
    //

    builder.addCase(fetchCommentators.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchCommentators.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.commentators = action.payload;
    });
    builder.addCase(fetchCommentators.rejected, (state) => {
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

export const {
  setInputNumber,
  setAttention,
  setClearFindUserFriends,
  setClearFindUserSubscribers,
  setClearCommentators,
} = userSlice.actions;
export const playerReducer = userSlice.reducer;
