import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import courseReducer from '../features/courses/courseSlice';
import studentReducer from '../features/users/studentSlice';
import instructorReducer from '../features/users/instructorSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'courses', 'students', 'instructors']
};

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  students: studentReducer,
  instructors: instructorReducer
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
