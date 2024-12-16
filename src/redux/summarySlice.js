import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "summary",
  initialState: {
    data: undefined,
  },
  reducers: {
    setCheckoutData(state, { payload }) {
      return { ...state, data: payload };
    },
  },
});

export const { setCheckoutData } = slice.actions;

export default slice.reducer;
