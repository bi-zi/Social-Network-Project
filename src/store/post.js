import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postText: '',
  postImage: [],
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
    },

  }
})

export const { setPostText } = postSlice.actions
export default postSlice.reducer
