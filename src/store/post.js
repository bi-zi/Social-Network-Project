import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postText: '',
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
    }

  }
})

export const { setPostText, setPostImage, setPostImageDelete } = postSlice.actions
export default postSlice.reducer
