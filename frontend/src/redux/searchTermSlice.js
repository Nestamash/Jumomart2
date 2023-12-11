import { createSlice } from '@reduxjs/toolkit';

const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: null,
  reducers: {
    setSearchTerm: (state, action) => action.payload,
  },
});

export const { setSearchTerm } = searchTermSlice.actions;
export const selectSearchTerm = (state) => state.searchTerm;
export default searchTermSlice.reducer;