import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../src/utils/GeneralHelpers';
import { Assignment } from '../../src/types/MyTypes.type';



interface AssignmentState {
    assignments: Assignment[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AssignmentState = {
    assignments: [],
    status: 'idle',
    error: null,
};

export const addAssignmentAsync = createAsyncThunk<Assignment, Assignment, { rejectValue: string }>(
    'assignments/addAssignment',
    async (assigment, { rejectWithValue }) => {
      try {
        console.log("addAssignment: " + assigment)
        const token = getToken();
        const response = await fetch(`http://localhost:5000/api/assignments/add`, {
          headers: {
            method: 'POST',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
  
        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }

        const data: Assignment = await response.json();
        console.log(data);
        return data;
    } catch (error: any) {
        console.error('Error fetching assignments:', error);
        return rejectWithValue('Network error while adding assignment');
      }
    }
  );


export const getAssignmentsAsync = createAsyncThunk<Assignment[], { courseId?: string; userId?: number }, { rejectValue: string }>(
    'assignments/getAssignments',
    async (params, { rejectWithValue }) => {
      try {
        // const {courseId, userId} = params;
        const queryParams = new URLSearchParams();
        if (params?.courseId) queryParams.append('courseId', params.courseId.toString());
        if (params?.userId) queryParams.append('userId', params.userId.toString());

        const url = `http://localhost:5000/api/assignments/get-student-assignments?${queryParams.toString()}`;
        
        const token = getToken();
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }
        return data;
      } catch (error: any) {
        console.error('Error fetching assignments:', error);
        return rejectWithValue('Network error while fetching assignments');
      }
    }
  );

  // Update Assignment
export const updateAssignmentAsync = createAsyncThunk<Assignment, Assignment, { rejectValue: string }>(
    'assignments/updateAssignment',
    async (assignment, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await fetch(`http://localhost:5000/api/assignments/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(assignment),
            });

            if (!response.ok) {
                throw new Error('Failed to update assignment');
            }

            const data: Assignment = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error updating assignment:', error);
            return rejectWithValue('Network error while updating assignment');
        }
    }
);

// Delete Assignment
export const deleteAssignmentAsync = createAsyncThunk<string, string, { rejectValue: string }>(
    'assignments/deleteAssignment',
    async (assignmentId, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await fetch(`http://localhost:5000/api/assignments/delete?assignmentId=${assignmentId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete assignment');
            }

            return assignmentId; // Return assignmentId so we can remove it from the state
        } catch (error: any) {
            console.error('Error deleting assignment:', error);
            return rejectWithValue('Network error while deleting assignment');
        }
    }
);

  const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        resetAssignments: (state) => {
            state.assignments = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
      builder
      .addCase(getAssignmentsAsync.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(getAssignmentsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assignments = action.payload;
    })
    .addCase(getAssignmentsAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
            state.error = action.payload;
        } else {
            state.error = action.error.message || 'Unknown error';
        }
    })

    // Add Assignment
    .addCase(addAssignmentAsync.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(addAssignmentAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assignments.push(action.payload);
    })
    .addCase(addAssignmentAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
            state.error = action.payload;
        } else {
            state.error = action.error.message || 'Unknown error';
        }
    })

    // Update Assignment
    .addCase(updateAssignmentAsync.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(updateAssignmentAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.assignments.findIndex(
            (assignment) => assignment.assignmentId === action.payload.assignmentId
        );
        if (index !== -1) {
            state.assignments[index] = action.payload;
        }
    })
    .addCase(updateAssignmentAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
            state.error = action.payload;
        } else {
            state.error = action.error.message || 'Unknown error';
        }
    })

    // Delete Assignment
    .addCase(deleteAssignmentAsync.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(deleteAssignmentAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assignments = state.assignments.filter(
            (assignment) => assignment.assignmentId !== action.payload
        );
    })
    .addCase(deleteAssignmentAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
            state.error = action.payload;
        } else {
            state.error = action.error.message || 'Unknown error';
        }
    });
},
  });

  export const { resetAssignments } = assignmentSlice.actions;

  export default assignmentSlice.reducer;