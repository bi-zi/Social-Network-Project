import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: '',
  lastName: '',
  photos: [],

}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload
    },
    setLastName: (state, action) => {
      state.lastName = action.payload
    },
    setPhotos: (state, action) => {
      state.photos.push(action.payload)
    }

  }

})

export const { setFirstName, setLastName, setPhotos } = userSlice.actions
export default userSlice.reducer
