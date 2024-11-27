import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getAllInstructorsAsync = createAsyncThunk(
    'instructor/getAllInstructors',
    async (_, { rejectWithValue }) => {
        try{
            const response = await fetch('http://localhost:5000/api/instructors/all');
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error('Failed to fetch student courses');
            }
            return data;
        } catch (error) {
            console.error('Error fetching instructors:', error);            
            return rejectWithValue('Network error while fetching instructors');
        }
    }
)

const initialState = {
    instructors: getAllInstructorsAsync,
    status: 'idle',
    error: null
}

const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers:{
        resestInstructors: (state) => {
            state.instructors = [];
            state.status = 'idle',
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllInstructorsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllInstructorsAsync.fulfilled, (state, action) => {
                console.log(action.payload.slice(0, 10));
                state.instructors = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getAllInstructorsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const { resestInstructors} = instructorSlice.actions;
export default instructorSlice.reducer;