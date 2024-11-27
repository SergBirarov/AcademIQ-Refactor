import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define Student interface
interface Student {
  id: number;
  name: string;
  class: string;
  [key: string]: any; // Add more fields as required
}

// Define the initial state for student slice
interface StudentState {
  students: Student[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  status: 'idle',
  error: null,
};

// Thunk to get all students asynchronously
export const getAllStudentsAsync = createAsyncThunk<Student[], void, { rejectValue: string }>(
  'student/getAllStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/students/all');
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      return data;
    } catch (error: any) {
      console.error('Error fetching students:', error);
      return rejectWithValue('Network error while fetching students');
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    resetStudents: (state) => {
      state.students = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudentsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllStudentsAsync.fulfilled, (state, action: PayloadAction<Student[]>) => {
        console.log(action.payload.slice(0, 10)); // For debugging purposes
        state.students = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getAllStudentsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Failed to fetch students';
      });
  },
});

// Export the synchronous action creators
export const { resetStudents } = studentSlice.actions;

// Export the reducer to use in the store
export default studentSlice.reducer;
