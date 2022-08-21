import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Note, NoteSliceState, Status } from './types';
import axios from '../../backend/axios.js';

export const fetchNotifications = createAsyncThunk<Note[]>(
  'notifications/getUserNotifications/fetchNotifications',
  async (id) => {
    const { data } = await axios.get(`/notifications/getUserNotifications/${id}`);
    return data;
  },
);

export const fetchNotificationsPost = createAsyncThunk<Note[]>(
  'notifications/createNotifications/fetchPostNotifications',
  async (params) => {
    const { data } = await axios.post(`/notifications/createNotifications`, params);

    return data;
  },
);

export const fetchNotificationsPush = createAsyncThunk<Note[]>(
  'notifications/pushNotifications//fetchPushNotifications',
  async (params) => {
    const { data } = await axios.patch(`/notifications/pushNotifications`, params);

    return data;
  },
);

export const fetchNotificationsDelete = createAsyncThunk<Note[]>(
  'notifications/deleteNotifications/fetchNotificationsDelete',
  async (params) => {
    const { data } = await axios.patch(`/notifications/deleteNotifications`, params);

    return data;
  },
);

export const fetchdDeleteRequest = createAsyncThunk<Note[]>(
  'notifications/deleteRequest/fetchdDeleteRequest',
  async (params) => {
    const { data } = await axios.patch(`/notifications/deleteRequest`, params);

    return data;
  },
);

const initialState: NoteSliceState = {
  notifications: [],
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

    builder.addCase(fetchdDeleteRequest.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchdDeleteRequest.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchdDeleteRequest.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const notificationsReducer = notificationsSlice.reducer;
