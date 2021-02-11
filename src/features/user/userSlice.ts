import { createSlice } from '@reduxjs/toolkit'
import { RootStateOrAny } from 'react-redux'

interface UserInfosProps {
  pseudo: string | null
}

const initialState: UserInfosProps = { pseudo: null }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.pseudo = action.payload.pseudo
    },
    logout(state, action) {
      state.pseudo = null
    },
  },
})

export const { login, logout } = userSlice.actions
export const selectUser = (state: RootStateOrAny) => state.user.userInfos;
export default userSlice.reducer
