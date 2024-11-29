import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// // Define Student interface
export type StudentType = {
  UserId: number,
  FirstName: string,
  LastName: string,
  School_Year: number,
  Major: string,
  Phone: string,
  Picture_URL?: string,
  Address: string,
  City_Code: number,
  Enrollment: Date
}
// Define the initial state for student slice
interface StudentState {
  students: StudentType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  status: 'idle',
  error: null,
};

// Thunk to get all students asynchronously
export const getAllStudentsAsync = createAsyncThunk<StudentType[], void, { rejectValue: string }>(
  'student/getAllStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/students/all');
      const data: StudentType[] = await response.json();

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
      .addCase(getAllStudentsAsync.fulfilled, (state, action: PayloadAction<StudentType[]>) => {
        state.students = action.payload.slice(0, 10);
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
