import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "identification",
  initialState: {
    name: "",
    email: "",
    cpf: "",
    mobile: "",
    hasFinished: false,
    isEditing: true,
  },
  reducers: {
    setIdentification(state, { payload }) {
      return { ...state, hasFinished: true, isEditing: false, ...payload };
    },
    handleEditingIdentification(state) {
      return { ...state, isEditing: true };
    },
    cancelEditingIdentification(state) {
      return { ...state, isEditing: false };
    },
  },
});

export const {
  setIdentification,
  handleEditingIdentification,
  cancelEditingIdentification,
} = slice.actions;

export default slice.reducer;
