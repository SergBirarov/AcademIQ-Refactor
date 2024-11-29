import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import courseReducer from '../slices/courseSlice';
import instructorReducer from '../slices/instructorSlice';
import studentReducer from '../slices/studentSlice';
import taskReducer from '../slices/taskSlice';
import assignmentReducer from '../slices/assignmentSlice';
import submissionReducer from '../slices/submissionSlice';
import calendarReducer from '../slices/calendarSlice';

const persistConfig = {
  key: 'root',
  storage,

  whitelist: ['auth', 'courses', 'students', 'instructors', 'tasks', 'assignments', 'submissions', 'calendar'], 
};

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  students: studentReducer,
  instructors: instructorReducer,
  tasks: taskReducer,
  assignments: assignmentReducer,
  submissions: submissionReducer,
  calendar: calendarReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
