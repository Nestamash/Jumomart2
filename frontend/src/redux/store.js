import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import searchTermReducer from './searchTermSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    searchTerm: searchTermReducer,
  },
})