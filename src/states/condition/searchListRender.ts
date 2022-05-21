import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'states';

const INITIAL_STATE: boolean = false;

export const searchListRenderSlice = createSlice({
  name: 'searchListRender',
  initialState: INITIAL_STATE,
  reducers: {
    isShow: (state: boolean) => {
      let newState = state;
      newState = true;
      return newState;
    },
    isHidden: (state: boolean) => {
      let newState = state;
      newState = false;
      return newState;
    },
  },
});

export const { isShow, isHidden } = searchListRenderSlice.actions;
export default searchListRenderSlice.reducer;
export const isRender = (state: RootState): boolean => state.searchListRender;
