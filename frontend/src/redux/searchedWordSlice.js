// searchedWordSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const searchedWordSlice = createSlice({
  name: 'searchedWord',
  initialState: {
    value: '',
  },
  reducers: {
    setSearchWord: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchWord } = searchedWordSlice.actions;

export const selectSearchedWord = (state) => state.searchedWord.value;

export default searchedWordSlice.reducer;
