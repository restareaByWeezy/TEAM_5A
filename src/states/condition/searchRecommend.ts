import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'states';

const INITIAL_STATE: boolean = false;

const searchRecommendSlice = createSlice({
  name: 'searchRecommend',
  initialState: INITIAL_STATE,
  reducers: {
    isThings: (state: boolean) => {
      let newState = state;
      newState = true;
      return newState;
    },
    isNothing: (state: boolean) => {
      let newState = state;
      newState = false;
      return newState;
    },
  },
});

export const { isThings, isNothing } = searchRecommendSlice.actions;
export default searchRecommendSlice.reducer;
export const isRecommend = (state: RootState): boolean => state.searchRecommend;
