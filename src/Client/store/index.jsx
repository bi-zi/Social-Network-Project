import { configureStore } from '@reduxjs/toolkit';
import userSlice from './registration';
import infoSlice from './info';
import postSlice from './post';
import imagesSlice from './images';
import  wallSlice  from './wall';
import { authReducer } from './slices/auth.js';
import { aboutReducer } from './slices/about.js';
import { userReducer } from './slices/user.js';
import { sliderReducer } from './slices/slider.js';

export const store = configureStore({
  reducer: {
    u: userSlice,
    info: infoSlice,
    post: postSlice,
    images: imagesSlice,
    wall: wallSlice,
    auth: authReducer,
    about: aboutReducer,
    user: userReducer,
    slider: sliderReducer,
  },
});
