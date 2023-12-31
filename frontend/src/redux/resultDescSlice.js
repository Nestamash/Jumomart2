import { createSlice } from '@reduxjs/toolkit';

const resultDescSlice = createSlice({
  name: 'resultDesc',
  initialState: {
    resultDesc: null,
  },
  reducers: {
    setResultDesc: (state, action) => {
      state.resultDesc = action.payload;
    },
  },
});

export const { setResultDesc } = resultDescSlice.actions;

export const selectResultDesc = (state) => state.resultDesc.resultDesc;

export default resultDescSlice.reducer;
