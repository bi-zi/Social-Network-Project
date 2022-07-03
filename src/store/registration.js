import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: '',
  lastName: '',
  password: '',
  checkAuth: [localStorage.firstName, localStorage.lastName, localStorage.password],
  userAvatar: ["https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"],
  userPhotos: [],

  lives: '',
  from: '',
  born: '',
  profession: '',
  relationship: '',
  student: '',
  userInfo: [localStorage.lives, localStorage.from, localStorage.born, localStorage.profession, localStorage.relationship, localStorage.student],
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
    },
    setUserPhotosDelete: (state, action) => {
      state.userPhotos = action.payload
    },

    setLives: (state, action) => {
      state.lives = action.payload
    },
    setFrom: (state, action) => {
      state.from = action.payload
    },
    setBorn: (state, action) => {
      state.born = action.payload
    },
    setProfession: (state, action) => {
      state.profession = action.payload
    },
    setRelationship: (state, action) => {
      state.relationship = action.payload
    },
    setStudent: (state, action) => {
      state.student = action.payload
    },
    setInfo: (state, action) => {
      state.userInfo = action.payload
    },

  }

})

export const {
  setFirstName, setLastName, setPassword,
  setCheckAuth, setUserAvatar, setUserPhotos,
  setUserPhotosDelete, setLives, setFrom,
  setBorn, setProfession, setRelationship,
  setStudent, setInfo } = userSlice.actions
export default userSlice.reducer
