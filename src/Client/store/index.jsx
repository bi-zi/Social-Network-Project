import { configureStore } from '@reduxjs/toolkit';
import userSlice from './registration';
import infoSlice from './info';
import imagesSlice from './images';
import  wallSlice  from './wall';
import { authReducer } from './slices/auth.js';
import { aboutReducer } from './slices/about.js';
import { userReducer } from './slices/user.js';
import { sliderReducer } from './slices/slider.js';
import { postReducer } from './slices/post.js';

export const store = configureStore({
  reducer: {
    u: userSlice,
    info: infoSlice,

    images: imagesSlice,
    wall: wallSlice,
    auth: authReducer,
    about: aboutReducer,
    user: userReducer,
    slider: sliderReducer,
    post: postReducer,
  },
});
