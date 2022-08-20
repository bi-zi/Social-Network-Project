import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { authReducer } from './auth/slice';
import { userReducer } from './user/slice';
import { aboutReducer } from './about/slice';
import { messagesReducer } from './messages/slice';
import { sliderReducer } from './slider/slice';
import { postReducer } from './post/slice';

import { notificationsReducer } from './notifications/slice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    about: aboutReducer,
    user: userReducer,
    slider: sliderReducer,
    post: postReducer,
    note: notificationsReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
