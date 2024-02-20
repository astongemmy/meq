// import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import { getPersistConfig } from 'redux-deep-persist';
// import storage from 'redux-persist/lib/storage';
// import { persistStore } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import themeReducer from '@/components/shared/theme/reducer';

const reducers = combineReducers({
  theme: themeReducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // ignoredActions: [
      //   FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
      // ],
    }
  }),
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;