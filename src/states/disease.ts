import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IItem } from 'types/search'

import type { RootState } from '.'

export interface DiseaseState {
  diseaseList: IItem[]
}

const INITIAL_STATE: DiseaseState = {
  diseaseList: [],
}

const diseaseSlice = createSlice({
  name: 'disease',
  initialState: INITIAL_STATE,
  reducers: {
    setDisease: (state: DiseaseState, action: PayloadAction<IItem[]>) => {
      state.diseaseList = action.payload
    },
  },
})

export const { setDisease } = diseaseSlice.actions

export default diseaseSlice.reducer

// Selector =====================

export const getDisease = (state: RootState) => state.disease.diseaseList
