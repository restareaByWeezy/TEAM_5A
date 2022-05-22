import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'states';

const INITIAL_STATE: string = '';

export const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState: INITIAL_STATE,
  reducers: {
    setSearchValue: (state: string, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setSearchValue } = searchValueSlice.actions;
export default searchValueSlice.reducer;
export const getSearchValue = (state: RootState): string => state.searchValue;
