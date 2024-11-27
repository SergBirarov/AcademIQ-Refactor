import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getAllStudentsAsync = createAsyncThunk(
    'student/getAllStudents',
    async (_, { rejectWithValue }) => {
        try{
            const response = await fetch('http://localhost:5000/api/students/all');
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error('Failed to fetch student courses');
            }
            return data;
        } catch (error) {
            console.error('Error fetching courses:', error);            
            return rejectWithValue('Network error while fetching courses');
        }
    }
)

const initialState = {
    students: getAllStudentsAsync,
    status: 'idle',
    error: null,
};

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
            .addCase(getAllStudentsAsync.fulfilled, (state, action) => {
                console.log(action.payload.slice(0, 10));
                state.status = 'succeeded';
                state.students = action.payload;
            })
            .addCase(getAllStudentsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetStudents } = studentSlice.actions;
export default studentSlice.reducer;