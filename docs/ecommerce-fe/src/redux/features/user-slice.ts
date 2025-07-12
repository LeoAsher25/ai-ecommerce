import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signOut } from 'next-auth/react'

import { clearCart } from './cart-slice'

import { type ITokenReponse } from '@/types/common'
import { IProfile } from '@/types/user'

// Define the shape of the slice state
interface UserState extends ITokenReponse {
  currentUser: IProfile | null
}

// Helper function to serialize user data for Redux
const serializeUserData = (userData: any): IProfile | null => {
  if (!userData) return null

  return {
    ...userData,
    dob: userData.dob ? new Date(userData.dob).toISOString() : undefined,
    createdAt: userData.createdAt ? new Date(userData.createdAt).toISOString() : undefined,
    updatedAt: userData.updatedAt ? new Date(userData.updatedAt).toISOString() : undefined,
    lastLogin: userData.lastLogin ? new Date(userData.lastLogin).toISOString() : undefined,
  }
}

// Define the initial state
const initialState: UserState = {
  currentUser: null,
  accessToken: undefined,
  refreshToken: undefined,
}

// Create async thunk for logout
export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { dispatch }) => {
  signOut({ redirect: false })
  dispatch(clearCart())
  return null
})

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
      // Handle serialization of user data
      if (action.payload.currentUser !== undefined) {
        state.currentUser = serializeUserData(action.payload.currentUser)
      }

      // Handle other fields normally
      if (action.payload.accessToken !== undefined) {
        state.accessToken = action.payload.accessToken
      }
      if (action.payload.refreshToken !== undefined) {
        state.refreshToken = action.payload.refreshToken
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.currentUser = null
      state.accessToken = undefined
      state.refreshToken = undefined
    })
  },
})

export const userActions = userSlice.actions

// Export the reducer
export default userSlice.reducer
