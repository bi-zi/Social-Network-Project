import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Note, NoteSliceState, Status } from './types';
import axios from '../../backend/axios.js';

export const fetchNotifications = createAsyncThunk(
  'notifications/getUserNotifications/fetchNotifications',
  async (id: string) => {
    const { data } = await axios.get<Note>(`/notifications/getUserNotifications/${id}`);
    return data;
  },
);

export const fetchNotificationsPost = createAsyncThunk<Note, { fromWho: string; user: string }>(
  'notifications/createNotifications/fetchPostNotifications',
  async ({ fromWho, user }: { fromWho: string; user: string }) => {
    const { data } = await axios.post<Note>(`/notifications/createNotifications`, { fromWho, user });

    return data;
  },
);

export const fetchNotificationsPush = createAsyncThunk<Note, { fromWho: string; id: string }>(
  'notifications/pushNotifications//fetchPushNotifications',
  async ({ fromWho, id }: { fromWho: string; id: string }) => {
    const { data } = await axios.patch<Note>(`/notifications/pushNotifications`, { fromWho ,id});

    return data;
  },
);

export const fetchNotificationsDelete = createAsyncThunk(
  'notifications/deleteNotifications/fetchNotificationsDelete',
  async (params: {}) => {
    const { data } = await axios.patch<Note>(`/notifications/deleteNotifications`, params);

    return data;
  },
);

export const fetchDeleteRequest = createAsyncThunk<Note, { index: number; id: string }>(
  'notifications/deleteRequest/fetchdDeleteRequest',
  async ({ index, id }: { index: number; id: string }) => {
    const { data } = await axios.patch(`/notifications/deleteRequest`,{index,id} );

    return data;
  },
);

const initialState: NoteSliceState = {
  notifications: {} as Note,
  status: Status.LOADING,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.notifications = action.payload;
    });
    builder.addCase(fetchNotifications.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchNotificationsPost.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchNotificationsPost.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchNotificationsPost.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchNotificationsPush.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchNotificationsPush.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchNotificationsPush.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchNotificationsDelete.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchNotificationsDelete.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchNotificationsDelete.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchDeleteRequest.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchDeleteRequest.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchDeleteRequest.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const NoteReducer = notificationsSlice.reducer;
