import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserPost, UserPostSliceState, Status } from './types';
import axios from '../../backend/axios';

export const fetchUserPostsAll = createAsyncThunk(
  '/post/userPostsAll/:id/fetchUserPostAll',
  async (id: string) => {
    const { data } = await axios.get<UserPost[]>(`/post/userPostsAll/${id}`);
    return data;
  },
);

export const fetchCreatePost = createAsyncThunk<
  UserPost[],
  { text: string; videoPost: string; imagesPost: string[] }
>(
  '/post/createPost/fetchCreatePost',
  async ({ text, videoPost, imagesPost }: { text: string; videoPost: string; imagesPost: string[] }) => {
    const { data } = await axios.post(`/post/createPost`, { text, videoPost, imagesPost });

    return data;
  },
);

export const fetchPostPush = createAsyncThunk<
  UserPost[],
  {
    text: string;
    videoPost: string;
    imagesPost: string[];
    user: string;
  }
>(
  '/post/PostPush/fetchPostPush',
  async ({
    text,
    videoPost,
    imagesPost,
    user,
  }: {
    text: string;
    videoPost: string;
    imagesPost: string[];
    user: string;
  }) => {
    const { data } = await axios.patch(`/post/PostPush/${user}`, { text, videoPost, imagesPost });

    return data;
  },
);

export const fetchPostLike = createAsyncThunk<
  UserPost[],
  { _id: string; likeDislike: string | undefined | number; index: number; user: string }
>(
  '/post/like/fetchPostLike',
  async ({
    _id,
    likeDislike,
    index,
    user,
  }: {
    _id: string;
    likeDislike: string | undefined | number;
    index: number;
    user: string;
  }) => {
    const { data } = await axios.patch(`/post/like/${user}`, { _id, likeDislike, index });

    return data;
  },
);

export const fetchPostDislike = createAsyncThunk<
  UserPost[],
  { _id: string; likeDislike: string | undefined | number; index: number; user: string }
>(
  '/post/dislike/fetchPostDislike',
  async ({
    _id,
    likeDislike,
    index,
    user,
  }: {
    _id: string;
    likeDislike: string | undefined | number;
    index: number;
    user: string;
  }) => {
    const { data } = await axios.patch(`/post/dislike/${user}`, { _id, likeDislike, index });

    return data;
  },
);

export const fetchCommentPush = createAsyncThunk<
  UserPost[],
  {
    _id: string;
    firstName: string;
    lastName: string;
    commentText: string;
    commentDate: string;
    userId: string;
    user: string;
  }
>(
  '/post/commentPush/fetchCommentPush',
  async ({
    _id,
    firstName,
    lastName,
    commentText,
    commentDate,
    userId,
    user,
  }: {
    _id: string;
    firstName: string;
    lastName: string;
    commentText: string;
    commentDate: string;
    userId: string;
    user: string;
  }) => {
    const { data } = await axios.patch(`/post/commentPush/${user}`, {
      _id,
      firstName,
      lastName,
      commentText,
      commentDate,
      userId,
    });

    return data;
  },
);

export const fetchCommentDelete = createAsyncThunk<
  UserPost[],
  { postId: string; index: number; user: string }
>(
  '/post/deleteComment/fetchCommentDelete',
  async ({ postId, index, user }: { postId: string; index: number; user: string }) => {
    const { data } = await axios.patch(`/post/deleteComment/${user}`, { postId, index });

    return data;
  },
);

export const fetchPostDelete = createAsyncThunk<UserPost[], { deleteId: number; user: string }>(
  '/post/deletePost/fetchPostDelete',
  async ({ deleteId, user }: { deleteId: number; user: string }) => {
    const { data } = await axios.patch(`/post/deletePost/${user}`, { deleteId });

    return data;
  },
);

const initialState: UserPostSliceState = {
  createText: localStorage.postText,
  createImg:
    localStorage.postImages !== undefined
      ? [...JSON.parse(localStorage.getItem('postImages') || '')].map((x) => x)
      : [],
  createVid: localStorage.postVideo,
  comments: 9999999,
  createComment: '',
  postIndex: '',
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
    setPostIndex: (state, action) => {
      state.postIndex = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
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

export const {
  setCreatText,
  setCreateImg,
  setCreateImgDelete,
  setCreateVid,
  setComments,
  setCreateComment,
  setPostIndex,
} = postSlice.actions;
export const postReducer = postSlice.reducer;
