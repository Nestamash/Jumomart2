// categoryClickedSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const categoryClickedSlice = createSlice({
  name: 'categoryClicked',
  initialState: {
    value: '',
  },
  reducers: {
    setCategoryClicked: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCategoryClicked } = categoryClickedSlice.actions;

export const selectCategoryClicked = (state) => state.categoryClicked.value;

export default categoryClickedSlice.reducer;