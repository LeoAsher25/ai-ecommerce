import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProductCategory } from '@/types/productCategory'

type InitialState = {
  categories: IProductCategory[]
}

const initialState: InitialState = {
  categories: [],
}

export const category = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<InitialState>) => {
      Object.assign(state, action.payload)
    },
  },
})

export const categoryActions = category.actions
export default category.reducer
