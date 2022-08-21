import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserPost, UserPostSliceState, Status } from './types';
import axios from '../../backend/axios.js';

export const fetchUserPostsAll = createAsyncThunk(
  '/post/userPostsAll/:id/fetchUserPostAll',
  async (id: string) => {
    const { data } = await axios.get<UserPost[]>(`/post/userPostsAll/${id}`);
    return data;
  },
);

export const fetchCreatePost = createAsyncThunk<UserPost[]>(
  '/post/createPost/fetchCreatePost',
  async (params) => {
    const { data } = await axios.post(`/post/createPost`, params);

    return data;
  },
);

export const fetchPostPush = createAsyncThunk<UserPost[]>(
  '/post/PostPush/fetchPostPush',
  async (params, id) => {
    const { data } = await axios.patch(`/post/PostPush/${id}`, params);

    return data;
  },
);

export const fetchPostLike = createAsyncThunk<UserPost[]>(
  '/post/like/fetchPostLike',
  async (params, id) => {
    const { data } = await axios.patch(`/post/like/${id}`, params);

    return data;
  },
);

export const fetchPostDislike = createAsyncThunk<UserPost[]>(
  '/post/dislike/fetchPostDislike',
  async (params, id) => {
    const { data } = await axios.patch(`/post/dislike/${id}`, params);

    return data;
  },
);

export const fetchCommentPush = createAsyncThunk<UserPost[]>(
  '/post/commentPush/fetchCommentPush',
  async (params, id) => {
    const { data } = await axios.patch(`/post/commentPush/${id}`, params);

    return data;
  },
);

export const fetchCommentDelete = createAsyncThunk<UserPost[]>(
  '/post/deleteComment/fetchCommentDelete',
  async (params, id) => {
    const { data } = await axios.patch(`/post/deleteComment/${id}`, params);

    return data;
  },
);

export const fetchPostDelete = createAsyncThunk<UserPost[]>(
  '/post/deletePost/fetchPostDelete',
  async (params, id) => {
    const { data } = await axios.patch(`/post/deletePost/${id}`, params);

    return data;
  },
);

const initialState: UserPostSliceState = {
  createText: localStorage.postText,
  createImg: [],
  createVid: localStorage.postVideo,
  createComment: '',
  userPosts: {
    post: [],
    status: Status.LOADING,
  },
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setCreatText: (state, action) => {
      state.createText = action.payload;
    },
    setCreateImg: (state, action) => {
      state.createImg.push(action.payload);
    },
    setCreateImgDelete: (state, action) => {
      state.createImg = action.payload;
    },
    setCreateVid: (state, action) => {
      state.createVid = action.payload;
    },
    setCreateComment: (state, action) => {
      state.createComment = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserPostsAll.pending, (state) => {
      state.userPosts.status = Status.LOADING;
    });
    builder.addCase(fetchUserPostsAll.fulfilled, (state, action) => {
      state.userPosts.status = Status.SUCCESS;
      state.userPosts.post = action.payload;
    });
    builder.addCase(fetchUserPostsAll.rejected, (state) => {
      state.userPosts.status = Status.ERROR;
    });

    builder.addCase(fetchCreatePost.pending, (state) => {
      state.userPosts.status = Status.LOADING;
    });
    builder.addCase(fetchCreatePost.fulfilled, (state) => {
      state.userPosts.status = Status.SUCCESS;
    });
    builder.addCase(fetchCreatePost.rejected, (state) => {
      state.userPosts.status = Status.ERROR;
    });

    builder.addCase(fetchPostPush.pending, (state) => {
      state.userPosts.status = Status.LOADING;
    });
    builder.addCase(fetchPostPush.fulfilled, (state) => {
      state.userPosts.status = Status.SUCCESS;
    });
    builder.addCase(fetchPostPush.rejected, (state) => {
      state.userPosts.status = Status.ERROR;
    });

    builder.addCase(fetchPostLike.pending, (state) => {
      state.userPosts.status = Status.LOADING;
    });
    builder.addCase(fetchPostLike.fulfilled, (state) => {
      state.userPosts.status = Status.SUCCESS;
    });
    builder.addCase(fetchPostLike.rejected, (state) => {
      state.userPosts.status = Status.ERROR;
    });

    builder.addCase(fetchPostDislike.pending, (state) => {
      state.userPosts.status = Status.LOADING;
    });
    builder.addCase(fetchPostDislike.fulfilled, (state) => {
      state.userPosts.status = Status.SUCCESS;
    });
    builder.addCase(fetchPostDislike.rejected, (state) => {
      state.userPosts.status = Status.ERROR;
    });

    builder.addCase(fetchCommentPush.pending, (state) => {
      state.userPosts.status = Status.LOADING;
    });
    builder.addCase(fetchCommentPush.fulfilled, (state) => {
      state.userPosts.status = Status.SUCCESS;
    });
    builder.addCase(fetchCommentPush.rejected, (state) => {
      state.userPosts.status = Status.ERROR;
    });

    builder.addCase(fetchCommentDelete.pending, (state) => {
      state.userPosts.status = Status.LOADING;
    });
    builder.addCase(fetchCommentDelete.fulfilled, (state) => {
      state.userPosts.status = Status.SUCCESS;
    });
    builder.addCase(fetchCommentDelete.rejected, (state) => {
      state.userPosts.status = Status.ERROR;
    });

    builder.addCase(fetchPostDelete.pending, (state) => {
      state.userPosts.status = Status.LOADING;
    });
    builder.addCase(fetchPostDelete.fulfilled, (state) => {
      state.userPosts.status = Status.SUCCESS;
    });
    builder.addCase(fetchPostDelete.rejected, (state) => {
      state.userPosts.status = Status.ERROR;
    });
  },
});

export const { setCreatText, setCreateImg, setCreateImgDelete, setCreateVid, setCreateComment } =
  postSlice.actions;
export const postReducer = postSlice.reducer;
