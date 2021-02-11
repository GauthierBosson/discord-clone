import { createSlice } from '@reduxjs/toolkit'
import { RootStateOrAny } from 'react-redux'

interface UserProps {
  userInfos: {
    pseudo: string
  } | null
}

const initialState: UserProps = { userInfos: null }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.userInfos = action.payload
    },
    logout(state) {
      state.userInfos = null
    },
  },
})

export const { login, logout } = userSlice.actions
export const selectUser = (state: RootStateOrAny): UserProps => state.user;
export default userSlice.reducer
