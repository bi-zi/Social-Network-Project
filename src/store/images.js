import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inputNumber: '',
  avatarImages: [localStorage.avatarImages],
  sliderImages: [...JSON.parse(localStorage.getItem('sliderImages'))],
  postImages: [...JSON.parse(localStorage.getItem('postImages'))],
}

export const imagesSlice = createSlice({
  name: 'images',
  initialState,

  reducers: {
    setInputNumber: (state, action) => {
      state.inputNumber = action.payload
    },
    setAvatarImages: (state, action) => {
      state.avatarImages = (action.payload)
    },
    setSliderImages: (state, action) => {
      state.sliderImages.push(action.payload)
    },
    setPostImages: (state, action) => {
      state.postImages.push(action.payload)
    },
    setPostImageDelete: (state, action) => {
      state.postImage = action.payload
    },

  }
})

export const { setInputNumber, setAvatarImages, setSliderImages, setPostImages } = imagesSlice.actions
export default imagesSlice.reducer
