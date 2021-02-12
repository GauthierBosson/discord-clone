import { createSlice } from '@reduxjs/toolkit'
import { RootStateOrAny } from 'react-redux'

type UserState = { username: string } | { username: null }

const initialState: UserState = { username: null }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.username = action.payload
    },
    logout(state) {
      state.username = null
    },
    userPresence(state, action) {
      state.username = action.payload
    }
  },
})

export const { login, logout, userPresence } = userSlice.actions
export const selectUser = (state: RootStateOrAny): UserState => state.user
export default userSlice.reducer
