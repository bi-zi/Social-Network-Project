import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../store/registration'

export const store = configureStore({
  reducer: {
   user: userSlice,
  }
});
