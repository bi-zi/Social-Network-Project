import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: '',
  lastName: '',
  password: '',
  checkAuth: [localStorage.firstName, localStorage.lastName, localStorage.password],
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
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setCheckAuth: (state, action) => {
      state.checkAuth = (action.payload)
    },
  }
})

export const {
  setFirstName, setLastName, setPassword, setCheckAuth } = userSlice.actions
export default userSlice.reducer
