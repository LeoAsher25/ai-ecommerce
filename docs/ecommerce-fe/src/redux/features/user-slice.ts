import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { signOut } from 'next-auth/react'

import { type ITokenReponse } from '@/types/common'
import { IProfile } from '@/types/user'

// Define the shape of the slice state
interface UserState extends ITokenReponse {
  currentUser: IProfile | null
}

// Define the initial state
const initialState: UserState = {
  currentUser: null,
  accessToken: undefined,
  refreshToken: undefined,
}

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the user information
    setToken: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
      }>
    ) => {
      const { accessToken, refreshToken } = action.payload

      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },

    logout: (state) => {
      signOut({ redirect: false })
      state.currentUser = null
      state.accessToken = undefined
      state.refreshToken = undefined
    },

    setItem: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload)
    },
  },
})

export const userActions = userSlice.actions

// Export the reducer
export default userSlice.reducer
