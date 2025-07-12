import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

import shopData from '@/components/Shop/shopData'

type InitialState = {
  items: CartItem[]
}

type CartItem = {
  _id: string
  productId: string
  name: string
  sellingPrice: number
  quantity: number
  images: string[]
}

const initialState: InitialState = {
  items: [],
}

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { _id, name, quantity, sellingPrice, images } = action.payload
      const existingItem = state.items.find((item) => item._id === _id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          _id,
          productId: _id,
          name,
          quantity,
          sellingPrice,
          images,
        })
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload
      console.log('itemId: ', itemId)
      state.items = state.items.filter((item) => item._id !== itemId)
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
      const { _id, quantity } = action.payload
      const existingItem = state.items.find((item) => item._id === _id)

      if (existingItem) {
        existingItem.quantity = quantity
      }
    },

    removeAllItemsFromCart: (state) => {
      state.items = []
    },

    clearCart: (state) => {
      state.items = []
    },
  },
})

export const selectCartItems = (state: RootState) => (state.cartReducer as InitialState).items

export const selectTotalPrice = createSelector([selectCartItems], (items: CartItem[]) => {
  return items.reduce((total, item) => {
    return total + item.sellingPrice * item.quantity
  }, 0)
})

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
  clearCart,
} = cart.actions
export default cart.reducer
