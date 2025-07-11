import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProduct } from '@/types/product'

type InitialState = {
  value: IProduct
}

const initialState = {
  value: {
    title: '',
    reviews: 0,
    price: 0,
    sellingPrice: 0,
    img: '',
    id: 0,
    images: [],
    imgs: { thumbnails: [], previews: [] },
  } as IProduct,
} as InitialState

export const quickView = createSlice({
  name: 'quickView',
  initialState,
  reducers: {
    updateQuickView: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      }
    },

    resetQuickView: () => {
      return {
        value: initialState.value,
      }
    },
  },
})

export const { updateQuickView, resetQuickView } = quickView.actions
export default quickView.reducer
