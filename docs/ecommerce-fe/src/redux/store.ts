import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cartReducer from './features/cart-slice'
import categoryReducer from './features/category-clice'
import productDetailsReducer from './features/product-details'
import quickViewReducer from './features/quickView-slice'
import userReducer from './features/user-slice'
import wishlistReducer from './features/wishlist-slice'

// Configure persist for cart
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'], // Only persist cart items
}

// Configure persist for user
const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['currentUser', 'accessToken', 'refreshToken'], // Persist user data
}

export const store = configureStore({
  reducer: {
    quickViewReducer,
    cartReducer: persistReducer(cartPersistConfig, cartReducer),
    wishlistReducer,
    productDetailsReducer,
    userReducer: persistReducer(userPersistConfig, userReducer),
    categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
