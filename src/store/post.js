import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postText: '',
  postImage: [localStorage.postImage],
  postMusic: [],
  postLocation: [],
  postFile: [],
}

export const postSlice = createSlice({
  name: 'post',
  initialState,

  reducers: {
    setPostText: (state, action) => {
      state.postText = action.payload
    }, setPostImage: (state, action) => {
      state.postImage.push(action.payload)
    },
    setUserPhotosDelete: (state, action) => {
      state.userPhotos = action.payload
    },

  }
})

export const { setPostText, setPostImage } = postSlice.actions
export default postSlice.reducer
