import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lives: '',
  from: '',
  born: '',
  profession: '',
  relationship: '',
  student: '',
  userInfo: [localStorage.lives, localStorage.from, localStorage.born, localStorage.profession, localStorage.relationship, localStorage.student],
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,

  reducers: {
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
  setLives, setFrom, setBorn,
  setProfession, setRelationship, setStudent,
  setInfo } = infoSlice.actions
export default infoSlice.reducer
