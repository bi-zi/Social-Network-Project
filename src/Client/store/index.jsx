import { configureStore } from '@reduxjs/toolkit';
import userSlice from './registration';
import infoSlice from './info';
import postSlice from './post';
import imagesSlice from './images';
import  wallSlice  from './wall';
import { authReducer } from './slices/auth.js';

export const store = configureStore({
  reducer: {
    user: userSlice,
    info: infoSlice,
    post: postSlice,
    images: imagesSlice,
    wall: wallSlice,
    auth: authReducer,
  },
});
