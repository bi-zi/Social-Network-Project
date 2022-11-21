import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Slider, SliderSliceState, Status } from './types';
import axios from '../../backend/axios';

export const fetchSlider = createAsyncThunk<Slider[], string>(
  'slider/user/fetchSlider',
  async (id: string) => {
    const { data } = await axios.get(`/slider/${id}`);
    return data;
  },
);

// export const fetchAllSlider = createAsyncThunk(
//   'slider/getAll/fetchSlider',
//   async () => {
//     const { data } = await axios.get(`/slider/all`);
//     return data;
//   },
// );

export const fetchSliderPost = createAsyncThunk<Slider[], { sliderImg: string }>(
  'slider/id/fetchSliderPost',
  async ({ sliderImg }: { sliderImg: string }) => {
    const { data } = await axios.post(`/slider`, { sliderImg });

    return data;
  },
);

export const fetchSliderPush = createAsyncThunk<Slider[], { sliderImg: string; id?: string }>(
  'slider/push/id/fetchSliderPush',
  async ({ sliderImg, id }: { sliderImg: string; id?: string }) => {
    const { data } = await axios.patch(`/slider/push/${id}`, { sliderImg });

    return data;
  },
);

export const fetchSliderDelete = createAsyncThunk<Slider[], { deleteId: number; user: string }>(
  'slider/delete/id/fetchSliderDelete',
  async ({ deleteId, user }: { deleteId: number; user: string }) => {
    const { data } = await axios.patch(`/slider/delete/${user}`, { deleteId });

    return data;
  },
);

const initialState: SliderSliceState = {
  slider: [] as Slider[],
  allSliders: [] as Slider[],
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

    // builder.addCase(fetchAllSlider.pending, (state) => {
    //   state.status = Status.LOADING;
    // });
    // builder.addCase(fetchAllSlider.fulfilled, (state, action) => {
    //   state.status = Status.SUCCESS;
    //   state.allSliders = action.payload;
    // });
    // builder.addCase(fetchAllSlider.rejected, (state) => {
    //   state.status = Status.ERROR;
    // });

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
