import { createSlice } from '@reduxjs/toolkit'


//...JSON.parse(localStorage.getItem('wallPost'))
const initialState = {
  wallContent: [...JSON.parse(localStorage.getItem('wallContent'))],
  wallText: '',
  wallImages: [],
  wallVideo: '',
  wallDate: '',
  wallLike: '',
  wallDislike: '',
  wallComments: ''
}

export const wallSlice = createSlice({
  name: 'post',
  initialState,

  reducers: {
    setWallContent: (state, action) => {
      state.wallContent.push(action.payload)
    },
    setWallContentNew: (state, action) => {
      state.wallContent = (action.payload)
    },
    setWallText: (state, action) => {
      state.wallText = action.payload
    },
    setWallImages: (state, action) => {
      state.wallImages = action.payload
    },
    setWallVideo: (state, action) => {
      state.wallVideo = action.payload
    },
    setWallDate: (state, action) => {
      state.wallDate = action.payload
    },
    setWallComments: (state, action) => {
      state.wallComments = action.payload
    },
  }
})

export const {
  setWallContent, setWallContentNew, setWallText, setWallImages,
  setWallVideo, setWallDate, setWallLike,
  setWallDislike, setWallComments } = wallSlice.actions
export default wallSlice.reducer
