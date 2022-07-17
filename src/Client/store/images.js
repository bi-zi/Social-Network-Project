import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../tryBack/axios.js'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  console.log(data)
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
  axios.delete(`/posts/${id}`),
);


const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  inputNumber: '',
  avatarImages: [],
  sliderImages: [],
  postImages: [],
}

export const imagesSlice = createSlice({
  name: 'images',
  initialState,

  reducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    setInputNumber: (state, action) => {
      state.inputNumber = action.payload
    },

    setAvatarImages: (state, action) => {
      state.avatarImages = (action.payload)

    },
    setAvatarImageDelete: (state, action) => {
      state.avatarImages = (action.payload)
    },

    setSliderImages: (state, action) => {
      state.sliderImages.push(action.payload)
    },
    setSLiderImagesDelete: (state, action) => {
      state.sliderImages = action.payload
    },

    setPostImages: (state, action) => {
      state.postImages.push(action.payload)
    },
    setPostImagesDelete: (state, action) => {
      state.postImages = action.payload
    },

  }
})

export const {
  setInputNumber, setAvatarImages, setAvatarImageDelete, setSliderImages,
  setSLiderImagesDelete, setPostImages, setPostImagesDelete
} = imagesSlice.actions
export default imagesSlice.reducer
