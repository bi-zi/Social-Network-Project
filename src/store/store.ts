import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { authReducer } from './auth/slice';
import { userReducer } from './user/slice';
import { aboutReducer } from './about/slice';
import { messagesReducer } from './messages/slice';
import { sliderReducer } from './slider/slice';
import { postReducer } from './post/slice';
import { NoteReducer } from './notifications/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    about: aboutReducer,
    user: userReducer,
    slider: sliderReducer,
    post: postReducer,
    note: NoteReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
