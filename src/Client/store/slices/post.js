import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../tryBack/axios.js';

export const fetchUserPostsAll = createAsyncThunk('/post/userPostsAll/:id/fetchUserPostAll', async (id) => {
  const { data } = await axios.get(`/post/userPostsAll/${id}`);
  return data;
});

export const fetchCreatePost = createAsyncThunk('/post/createPost/fetchCreatePost', async (params) => {
  const { data } = await axios.post(`/post/createPost`, params);

  return data;
});

export const fetchPostPush = createAsyncThunk('/post/PostPush/fetchPostPush', async (params, id) => {
  const { data } = await axios.patch(`/post/PostPush/${id}`, params);

  return data;
});

export const fetchPostLike = createAsyncThunk('/post/like/fetchPostLike', async (params, id) => {
  const { data } = await axios.patch(`/post/like/${id}`, params);

  return data;
});

const initialState = {
  createText: localStorage.postText,
  createImg: [...JSON.parse(localStorage.getItem('postImages'))],
  createVid: localStorage.postVideo,
  userPosts: {
    post: null,
    status: 'loading',
  }
};

const postSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setCreatText: (state, action) => {
      state.createText = action.payload
    },
    setCreateImg: (state, action) => {
      state.createImg.push(action.payload)
    },
    setCreateImgDelete: (state, action) => {
      state.createImg = action.payload
    },
    setCreateVid: (state, action) => {
      state.createVid = action.payload
    }

  },

  extraReducers: {
    [fetchUserPostsAll.pending]: (state) => {
      state.status = 'loading';
      state.userPosts.post = null;
    },
    [fetchUserPostsAll.fulfilled]: (state, action) => {
      state.userPosts.status = 'loaded';
      state.userPosts.post = action.payload;
    },
    [fetchUserPostsAll.rejected]: (state) => {
      state.userPosts.status = 'error';
      state.userPosts.post = null;
    },

  }
});

export const { setCreatText, setCreateImg, setCreateImgDelete, setCreateVid } = postSlice.actions
export const postReducer = postSlice.reducer;
