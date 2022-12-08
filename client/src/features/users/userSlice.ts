import { createSlice } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface userState {
  isLogged: boolean
  infos: any
}

const initialState: userState = {
  isLogged: false,
  infos: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLogged = true
      state.infos = action.payload
    },
  },
})

export const { loginUser } = userSlice.actions
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
