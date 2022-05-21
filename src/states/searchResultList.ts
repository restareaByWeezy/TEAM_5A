import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SearchResultList = {
  items: [],
};

const systemSlice = createSlice({
  name: 'searchResultList',
  initialState,
  reducers: {
    setSearchResultList(state: SearchResultList, action: PayloadAction<IItem[]>) {
      state.items = action.payload;
    },
  },
});

export interface SearchResultList {
  items: IItem[];
}

export default systemSlice.reducer;

export const { setSearchResultList } = systemSlice.actions;
