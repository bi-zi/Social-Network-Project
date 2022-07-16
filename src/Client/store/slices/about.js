import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../tryBack/axios.js';

export const fetchAbout = createAsyncThunk('about/fetchAbout', async () => {
  const { data } = await axios.get('/about/all');
  return data;
});

export const fetchAboutUpdate = createAsyncThunk('about/id/fetchAboutUpdate', async (params,id) => {

  const { data } = await axios.patch(`/about/${id}`, params);
  return data;
});


const initialState = {
  data: null,
  status: 'loading',
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAbout.pending]: (state) => {
      state.data = [];
      state.status = 'loading';
    },
    [fetchAbout.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAbout.rejected]: (state) => {
      state.data = [];
      state.status = 'error';
    },
  },
});

export const aboutReducer = aboutSlice.reducer;
