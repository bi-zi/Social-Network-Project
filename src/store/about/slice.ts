import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { About, AboutSliceState, Status } from './types';
import axios from '../../Backend/axios';

export const fetchAboutPost = createAsyncThunk<About[], { values: About }>(
  'about/fetchAboutPost',
  async ({ values }: { values: About }) => {
    const { data } = await axios.post('/about', values);
    return data;
  },
);

export const fetchAbout = createAsyncThunk('about/fetchAbout', async (id: string) => {
  const { data } = await axios.get(`/about/${id}}`);
  return data;
});

export const fetchAboutUpdate = createAsyncThunk<About[], { values: About; id: string }>(
  'about/id/fetchAboutUpdate',
  async ({ values, id }: { values: About; id: string }) => {
    const { data } = await axios.patch(`/about/${id}`, values);
    return data;
  },
);

const initialState: AboutSliceState = {
  data: [],
  status: Status.LOADING,
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAboutPost.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAboutPost.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchAboutPost.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchAbout.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAbout.fulfilled, (state, action) => {
      state.data = [action.payload];
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchAbout.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchAboutUpdate.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAboutUpdate.fulfilled, (state) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchAboutUpdate.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const aboutReducer = aboutSlice.reducer;
