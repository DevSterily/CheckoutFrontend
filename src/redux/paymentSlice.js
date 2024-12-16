import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "identification",
  initialState: {
    selectedPayment: "credit",
    isLoading: false,
    paymentData: undefined,
  },
  reducers: {
    setPayment(state, { payload }) {
      return { ...state, selectedPayment: payload };
    },
    setIsLoading(state, { payload }) {
      return { ...state, isLoading: payload };
    },
    setPaymentTransaction(state, { payload }) {
      return { ...state, paymentData: payload };
    },
  },
});

export const { setPayment, setIsLoading, setPaymentTransaction } =
  slice.actions;

export default slice.reducer;
