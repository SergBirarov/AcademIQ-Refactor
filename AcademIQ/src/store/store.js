import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import courseReducer from '../features/courses/courseSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'courses'], // Persist auth state only
};

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
