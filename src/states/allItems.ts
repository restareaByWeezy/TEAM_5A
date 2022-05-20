import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AllItems = {
  items: [],
};

const systemSlice = createSlice({
  name: 'allItems',
  initialState,
  reducers: {
    setAllItems(state: AllItems, action: PayloadAction<IItem[]>) {
      state.items = action.payload;
    },
  },
});

export interface AllItems {
  items: IItem[];
}

export default systemSlice.reducer;

export const { setAllItems } = systemSlice.actions;
