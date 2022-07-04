import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  userAvatar: [localStorage.avatar],
  userPhotos: [...localStorage.slider.split(',')],
}

export const photoSlice = createSlice({
  name: 'photo',
  initialState,

  reducers: {
    setUserAvatar: (state, action) => {
      state.userAvatar = (action.payload)
    },
    setUserPhotos: (state, action) => {
      state.userPhotos.push(action.payload)
    },
    setUserPhotosDelete: (state, action) => {
      state.userPhotos = action.payload
    },

  }
})

export const { setUserAvatar, setUserPhotos,
  setUserPhotosDelete } = photoSlice.actions
export default photoSlice.reducer
