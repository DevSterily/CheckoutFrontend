import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "identification",
  initialState: {
    selectedPayment: "credit",
  },
  reducers: {
    setPayment(state, { payload }) {
      return { ...state, selectedPayment: payload };
    },
  },
});

export const { setPayment } = slice.actions;

export default slice.reducer;
