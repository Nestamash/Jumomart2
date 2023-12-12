import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import searchTermReducer from './searchTermSlice';
import searchResultsReducer from './searchResultsSlice';
import searchedWordReducer from './searchedWordSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    searchTerm: searchTermReducer,
    searchResultsAction: searchResultsReducer,
    searchedWord: searchedWordReducer,
  },
})