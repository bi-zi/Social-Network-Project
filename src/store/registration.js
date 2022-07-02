import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: '',
  lastName: '',
  password: '',
  checkAuth: [localStorage.firstName, localStorage.lastName, localStorage.password],
  userAvatar: ["https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"],
  userPhotos: [],
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

    setUserAvatar: (state, action) => {
      state.userAvatar = (action.payload)
    },
    setUserPhotos: (state, action) => {
      state.userPhotos.push(action.payload)
    }
  }

})

export const { setFirstName, setLastName, setPassword, setCheckAuth, setUserAvatar, setUserPhotos } = userSlice.actions
export default userSlice.reducer
