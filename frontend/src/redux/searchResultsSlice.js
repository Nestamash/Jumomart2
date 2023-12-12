// searchResultsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const searchResultsSlice = createSlice({
  name: 'searchResultsAction',
  initialState: {
    results: [],
  },
  reducers: {
    setSearchResultsAction: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { setSearchResultsAction } = searchResultsSlice.actions;

export const selectSearchResults = (state) => state.searchResultsAction.results;

export default searchResultsSlice.reducer;
