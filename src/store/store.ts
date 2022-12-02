import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { authReducer } from './auth/slice';



import { playerReducer } from './old store/user/slice';
import { aboutReducer } from './old store/about/slice';
import { messagesReducer } from './old store/messages/slice';
import { sliderReducer } from './old store/slider/slice';
import { postReducer } from './old store/post/slice';
import { NoteReducer } from './old store/notifications/slice';
import { oldAuthReducer } from './old store/auth/slice';

import { friendsPageReducer } from './old store/friends/slice';

import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,






    oldAuth: oldAuthReducer,
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
