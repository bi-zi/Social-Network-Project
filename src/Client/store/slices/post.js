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

export const fetchPostLike = createAsyncThunk('/post/like/fetchPostLike', async (params,id) => {
  const { data } = await axios.patch(`/post/like/${id}`, params);

  return data;
});

export const fetchPostDislike = createAsyncThunk('/post/dislike/fetchPostDislike', async (params, id) => {
  const { data } = await axios.patch(`/post/dislike/${id}`, params);

  return data;
});

export const fetchCommentPush = createAsyncThunk('/post/commentPush/fetchCommentPush', async (params, id) => {
  const { data } = await axios.patch(`/post/commentPush/${id}`, params);

  return data;
});

export const fetchCommentDelete = createAsyncThunk('/post/deleteComment/fetchCommentDelete', async (params, id) => {
  const { data } = await axios.patch(`/post/deleteComment/${id}`, params);

  return data;
});

export const fetchPostDelete = createAsyncThunk('/post/deletePost/fetchPostDelete', async (params, id) => {
  const { data } = await axios.patch(`/post/deletePost/${id}`, params);

  return data;
});


const initialState = {
  createText: localStorage.postText,
  createImg: [],
  createVid: localStorage.postVideo,
  createComment: '',
  userPosts: {
    post: [],
    status: '',
  },
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
    },
    setCreateComment: (state, action) => {
      state.createComment = action.payload
    },

  },

  extraReducers: {
    [fetchUserPostsAll.pending]: (state) => {
      state.userPosts.status = 'loading';
    },
    [fetchUserPostsAll.fulfilled]: (state, action) => {
      state.userPosts.status = 'loaded';
      state.userPosts.post = action.payload;
    },
    [fetchUserPostsAll.rejected]: (state) => {
      state.userPosts.status = 'error';
    },

    [fetchCreatePost.pending]: (state) => { state.status = 'loading' },
    [fetchCreatePost.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchCreatePost.rejected]: (state) => { state.status = 'error' },

    [fetchPostPush.pending]: (state) => { state.status = 'loading' },
    [fetchPostPush.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchPostPush.rejected]: (state) => { state.status = 'error' },

    [fetchPostLike.pending]: (state) => { state.status = 'loading' },
    [fetchPostLike.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchPostLike.rejected]: (state) => { state.status = 'error' },

    [fetchPostDislike.pending]: (state) => { state.status = 'loading' },
    [fetchPostDislike.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchPostDislike.rejected]: (state) => { state.status = 'error' },

    [fetchCommentPush.pending]: (state) => { state.status = 'loading' },
    [fetchCommentPush.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchCommentPush.rejected]: (state) => { state.status = 'error' },

    [fetchCommentDelete.pending]: (state) => { state.status = 'loading' },
    [fetchCommentDelete.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchCommentDelete.rejected]: (state) => { state.status = 'error' },

    [fetchPostDelete.pending]: (state) => { state.status = 'loading' },
    [fetchPostDelete.fulfilled]: (state) => { state.status = 'loaded' },
    [fetchPostDelete.rejected]: (state) => { state.status = 'error' },
  }
});

export const { setCreatText, setCreateImg, setCreateImgDelete, setCreateVid, setCreateComment } = postSlice.actions
export const postReducer = postSlice.reducer;
