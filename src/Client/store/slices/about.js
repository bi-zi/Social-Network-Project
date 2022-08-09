import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../tryBack/axios.js';

export const fetchAboutPost = createAsyncThunk('about/fetchAboutPost', async (params) => {
  const { data } = await axios.post('/about', params);
  return data;
});

export const fetchAbout = createAsyncThunk('about/fetchAbout', async () => {
  const { data } = await axios.get('/about/all');
  return data;
});

export const fetchAboutUpdate = createAsyncThunk('about/id/fetchAboutUpdate', async (params, id) => {
  const { data } = await axios.patch(`/about/${id}`, params);
  return data;
});



const initialState = {
  data: [],
  status: 'loading',
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAboutPost.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAboutPost.fulfilled]: (state) => {
      state.status = 'loaded';
    },
    [fetchAboutPost.rejected]: (state) => {
      state.status = 'error';
    },


    [fetchAbout.pending]: (state) => { state.status = 'loading' },
    [fetchAbout.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded'
    },
    [fetchAbout.rejected]: (state) => { state.status = 'error' },

    [fetchAboutUpdate.pending]: (state) => { state.status = 'loading' },
    [fetchAboutUpdate.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchAboutUpdate.rejected]: (state) => { state.status = 'error' },
  },
});

export const aboutReducer = aboutSlice.reducer;
