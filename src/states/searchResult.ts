import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'states';

const initialState: SearchResult = {
  items: [],
};

const systemSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setSearchResult(state: SearchResult, action: PayloadAction<IItem[]>) {
      state.items = action.payload;
    },
  },
});

export interface SearchResult {
  items: IItem[];
}

export default systemSlice.reducer;

export const { setSearchResult } = systemSlice.actions;
export const getSearchResult = (state: RootState): string => state.searchValue;
