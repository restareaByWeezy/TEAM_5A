import { configureStore } from '@reduxjs/toolkit';

import searchValue from './searchValue';
import apiCount from './apiCount';
import searchResultList from './searchResultList';

export const store = configureStore({
  reducer: {
    searchValue,
    apiCount,
    searchResultList,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
