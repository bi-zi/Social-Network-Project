import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../tryBack/axios.js';

export const fetchSlider = createAsyncThunk('slider/fetchSlider', async () => {
  const { data } = await axios.get('/slider/all');
  return data;
});

export const fetchSliderPost = createAsyncThunk('slider/id/fetchSliderPost', async (params) => {
  const { data } = await axios.post(`/slider`, params);

  return data;
});

export const fetchSliderPush = createAsyncThunk('slider/push/id/fetchSliderPush', async (params, id) => {
  const { data } = await axios.patch(`/slider/push/${id}`, params);

  return data;
});

const initialState = {
  slider: null,
  status: 'loading',
};

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {

  },

  extraReducers: {
    [fetchSlider.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchSlider.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.slider = action.payload;
    },
    [fetchSlider.rejected]: (state) => {
      state.status = 'error';
    },

  }
});

export const sliderReducer = sliderSlice.reducer;
