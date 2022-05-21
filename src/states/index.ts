import { configureStore } from '@reduxjs/toolkit';

import searchListRenderReducer from './condition/searchListRender';
import searchRecommendReducer from './condition/searchRecommend';
import searchResultReducer from './condition/searchResult';
import searchValueReducer from './value/searchValue';

import allItems from './allItems';
import apiCount from './apiCount';
import searchResultList from './searchResultList';

export const store = configureStore({
  reducer: {
    searchListRender: searchListRenderReducer,
    searchRecommend: searchRecommendReducer,
    searchResult: searchResultReducer,
    searchValue: searchValueReducer,
    allItems,
    apiCount,
    searchResultList,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
