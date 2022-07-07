import { configureStore } from '@reduxjs/toolkit';
import userSlice from './registration';
import infoSlice from './info';
import photoSlice from './photo';
import postSlice from './post';
import imagesSlice from './images';

export const store = configureStore({
  reducer: {
    user: userSlice,
    info: infoSlice,
    photo: photoSlice,
    post: postSlice,
    images: imagesSlice,
  },
});
