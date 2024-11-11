import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../utils/GeneralHelpers';

// Thunk to get all courses asynchronously
export const getStudentCoursesAsync = createAsyncThunk(
    'courses/getAllCourses',  // Changed name for clarity
    async (_, { rejectWithValue }) => {
        const token = getToken();
        console.log("getStudentCoursesAsync token", token);
        if (token) {
            try {
                const response = await fetch('http://localhost:5000/api/coursesonair/student-courses', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch student courses');
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching courses:', error);
            return rejectWithValue('Network error while fetching courses');
            }
        }
    }
);

// Initial state of the courses slice
const initialState = {
    courses: [],
    status: 'idle',
    error: null,
};

// Slice for courses
const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        // Only use reducers for synchronous state updates
        resetCourses(state) {
            state.courses = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudentCoursesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getStudentCoursesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.courses = action.payload; 
            })
            .addCase(getStudentCoursesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

// Export the synchronous action creators
export const { resetCourses } = courseSlice.actions;

// Export the reducer to use in the store
export default courseSlice.reducer;
