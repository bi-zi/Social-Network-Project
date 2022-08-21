import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Slider, SliderSliceState, Status } from './types';
import axios from '../../backend/axios.js';

export const fetchSlider = createAsyncThunk<Slider[]>('slider/fetchSlider', async () => {
  const { data } = await axios.get<Slider[]>('/slider/all');
  return data;
});

export const fetchSliderPost = createAsyncThunk<Slider[]>(
  'slider/id/fetchSliderPost',
  async (params) => {
    const { data } = await axios.post(`/slider`, params);

    return data;
  },
);

export const fetchSliderPush = createAsyncThunk<Slider[]>(
  'slider/push/id/fetchSliderPush',
  async (params, id) => {
    const { data } = await axios.patch(`/slider/push/${id}`, params);

    return data;
  },
);

export const fetchSliderDelete = createAsyncThunk<Slider[]>(
  'slider/delete/id/fetchSliderDelete',
  async (params, id) => {
    const { data } = await axios.patch(`/slider/delete/${id}`, params);

    return data;
  },
);

const initialState: SliderSliceState = {
  slider: [] as Slider[],
  status: Status.LOADING,
};

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchSlider.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchSlider.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.slider = action.payload;
    });
    builder.addCase(fetchSlider.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchSliderPost.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchSliderPost.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchSliderPost.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchSliderPush.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchSliderPush.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchSliderPush.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchSliderDelete.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchSliderDelete.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchSliderDelete.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const sliderReducer = sliderSlice.reducer;
