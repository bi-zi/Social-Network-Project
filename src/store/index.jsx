import { configureStore } from '@reduxjs/toolkit';
import userSlice from './registration'
import infoSlice from './info'
import photoSlice from './photo'

export const store = configureStore({
  reducer: {
    user: userSlice,
    info: infoSlice,
    photo: photoSlice,
  },
});
