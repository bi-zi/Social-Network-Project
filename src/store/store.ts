import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { playerReducer } from './user/slice';
import { aboutReducer } from './about/slice';
import { messagesReducer } from './messages/slice';
import { sliderReducer } from './slider/slice';
import { postReducer } from './post/slice';
import { NoteReducer } from './notifications/slice';
import { authReducer } from './auth/slice';
import { secondAuthReducer } from './1newStore/auth/slice';
import { friendsPageReducer } from './friends/slice';

import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    secondAuth: secondAuthReducer,

    about: aboutReducer,
    user: playerReducer,

    friendsPage: friendsPageReducer,

    slider: sliderReducer,
    post: postReducer,
    note: NoteReducer,
    messages: messagesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
