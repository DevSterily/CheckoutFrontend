import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'step',
  initialState: {
    step: 1
  },
  reducers: {
    changeStep(state, { payload }) {
      return {...state, hasFinished: true, step: payload}
    },
  }
})

export const { changeStep } = slice.actions

export default slice.reducer