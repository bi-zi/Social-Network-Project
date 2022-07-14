import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postText: '',
  postVideo: localStorage.postVideo,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,

  reducers: {
    setPostText: (state, action) => {
      state.postText = action.payload
    },
    setPostVideo: (state, action) => {
      state.postVideo = action.payload
    }

  }
})

export const { setPostText, setPostVideo } = postSlice.actions
export default postSlice.reducer
