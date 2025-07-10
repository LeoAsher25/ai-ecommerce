import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import cartReducer from './features/cart-slice'
import categoryReducer from './features/category-clice'
import productDetailsReducer from './features/product-details'
import quickViewReducer from './features/quickView-slice'
import userReducer from './features/user-slice'
import wishlistReducer from './features/wishlist-slice'

export const store = configureStore({
  reducer: {
    quickViewReducer,
    cartReducer,
    wishlistReducer,
    productDetailsReducer,
    userReducer,
    categoryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
