import { configureStore } from '@reduxjs/toolkit';

import searchListRenderReducer from './condition/searchListRender';
import searchRecommendReducer from './condition/searchRecommend';
import searchResultReducer from './condition/searchResult';
import searchValueReducer from './value/searchValue';

export const store = configureStore({
  reducer: {
    searchListRender: searchListRenderReducer,
    searchRecommend: searchRecommendReducer,
    searchResult: searchResultReducer,
    searchValue: searchValueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
