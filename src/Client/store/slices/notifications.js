import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../tryBack/axios.js';

export const fetchNotifications = createAsyncThunk('notifications/getUserNotifications/fetchNotifications', async (id) => {
  const { data } = await axios.get(`/notifications/getUserNotifications/${id}`);
  return data;
});

export const fetchNotificationsPost = createAsyncThunk('notifications/createNotifications/fetchPostNotifications', async (params) => {
  const { data } = await axios.post(`/notifications/createNotifications`, params);

  return data;
});

export const fetchNotificationsPush = createAsyncThunk('notifications/pushNotifications//fetchPushNotifications', async (params) => {
  const { data } = await axios.patch(`/notifications/pushNotifications`, params);

  return data;
});

export const fetchNotificationsDelete = createAsyncThunk('notifications/deleteNotifications/fetchNotificationsDelete', async (params) => {
  const { data } = await axios.patch(`/notifications/deleteNotifications`, params);

  return data;
});

export const fetchdDeleteRequest = createAsyncThunk('notifications/deleteRequest/fetchdDeleteRequest', async (params) => {
  const { data } = await axios.patch(`/notifications/deleteRequest`, params);

  return data;
});

const initialState = {
  notifications: [],
  status: 'loading',
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {

  },

  extraReducers: {
    [fetchNotifications.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.notifications = action.payload;
    },
    [fetchNotifications.rejected]: (state) => {
      state.status = 'error';
    },

    [fetchNotificationsPost.pending]: (state) => { state.status = 'loading' },
    [fetchNotificationsPost.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchNotificationsPost.rejected]: (state) => { state.status = 'error' },

    [fetchNotificationsPush.pending]: (state) => { state.status = 'loading' },
    [fetchNotificationsPush.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchNotificationsPush.rejected]: (state) => { state.status = 'error' },

    [fetchNotificationsDelete.pending]: (state) => { state.status = 'loading' },
    [fetchNotificationsDelete.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchNotificationsDelete.rejected]: (state) => { state.status = 'error' },

    [fetchdDeleteRequest.pending]: (state) => { state.status = 'loading' },
    [fetchdDeleteRequest.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchdDeleteRequest.rejected]: (state) => { state.status = 'error' },
  }
});

export const notificationsReducer = notificationsSlice.reducer;
