import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'states';

const INITIAL_STATE: boolean = false;

export const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState: INITIAL_STATE,
  reducers: {
    isTrue: (state: boolean) => {
      let newState = state;
      newState = true;
      return newState;
    },
    isFalse: (state: boolean) => {
      let newState = state;
      newState = false;
      return newState;
    },
  },
});

export const { isTrue, isFalse } = searchResultSlice.actions;
export default searchResultSlice.reducer;
export const isResult = (state: RootState): boolean => state.searchResult;
