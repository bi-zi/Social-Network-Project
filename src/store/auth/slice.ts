import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User, AuthSliceState, Status, FormValues } from './types';
import axios from '../../backend/axios.js';



export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params: FormValues) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: FormValues) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk<User>('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

const initialState: AuthSliceState = {
  data: {} as User,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = {} as User;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.data = action.payload;
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.data = action.payload;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.data = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const selectIsAuth = (state: RootState) => (state.auth.data?._id !== undefined);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
