import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wallContent: [],
}

export const wallSlice = createSlice({
  name: 'post',
  initialState,

  reducers: {
    setWallContent: (state, action) => {
      state.wallContent.push(action.payload)
    },

  }
})

export const { setWallContent } = wallSlice.actions
export default wallSlice.reducer
