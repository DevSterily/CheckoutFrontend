import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "delivery",
  initialState: {
    costumerId: undefined,
    addresses: [],
    hasFinished: false,
    step: 1,
    selectedAddress: undefined,
    isEditing: true,
  },
  reducers: {
    setAddresses(state, { payload }) {
      return { ...state, step: 2, addresses: [...state.addresses, payload] };
    },
    newAddress(state) {
      return { ...state, step: 1 };
    },
    listAddress(state) {
      return { ...state, step: 2 };
    },
    selectAddress(state, { payload }) {
      return { ...state, selectedAddress: payload };
    },
    editAddresses(state, { payload }) {
      return { ...state, addresses: payload, step: 2 };
    },
    finishDelivery(state) {
      return { ...state, hasFinished: true, isEditing: false };
    },
    editDelivery(state) {
      return { ...state, isEditing: true };
    },
    setCostumerId(state, { payload }) {
      return { ...state, costumerId: payload };
    },
  },
});

export const {
  setAddresses,
  newAddress,
  listAddress,
  selectAddress,
  editAddresses,
  finishDelivery,
  editDelivery,
  setCostumerId,
} = slice.actions;

export default slice.reducer;
