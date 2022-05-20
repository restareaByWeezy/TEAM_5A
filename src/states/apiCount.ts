import { createSlice } from '@reduxjs/toolkit'

const initialState: APICount = {
  value: 0,
}

const systemSlice = createSlice({
  name: 'apiCount',
  initialState,
  reducers: {
    increment(state: APICount) {
      state.value += 1
    },
  },
})

export interface APICount {
  value: number
}

export default systemSlice.reducer

export const { increment } = systemSlice.actions
