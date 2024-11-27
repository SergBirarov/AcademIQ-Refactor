import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define Instructor interface
interface Instructor {
  id: number;
  name: string;
  department: string;
  [key: string]: any; // Add more fields as required
}

// Define the initial state for instructor slice
interface InstructorState {
  instructors: Instructor[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InstructorState = {
  instructors: [],
  status: 'idle',
  error: null,
};

// Thunk to get all instructors asynchronously
export const getAllInstructorsAsync = createAsyncThunk<Instructor[], void, { rejectValue: string }>(
  'instructor/getAllInstructors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/instructors/all');
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch instructors');
      }
      return data;
    } catch (error: any) {
      console.error('Error fetching instructors:', error);
      return rejectWithValue('Network error while fetching instructors');
    }
  }
);

const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    resetInstructors: (state) => {
      state.instructors = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInstructorsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllInstructorsAsync.fulfilled, (state, action: PayloadAction<Instructor[]>) => {
        console.log(action.payload.slice(0, 10)); // For debugging purposes
        state.instructors = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getAllInstructorsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Failed to fetch instructors';
      });
  },
});

// Export the synchronous action creators
export const { resetInstructors } = instructorSlice.actions;

// Export the reducer to use in the store
export default instructorSlice.reducer;
