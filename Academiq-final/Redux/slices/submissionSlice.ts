import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../src/utils/GeneralHelpers';

// Define the Submission interface
export interface Submission {
    submissionId?: string; // Using `string` instead of `ObjectId` for easy handling in client-side
    assignmentId: number;
    studentId: number;
    submissionDate: Date;
    fileId: string;
    grade?: number;
    feedback?: string;
}

interface SubmissionState {
    submissions: Submission[];
    updatedSubmission: Partial<Submission> | null;
    submission: Submission | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SubmissionState = {
    submissions: [],
    updatedSubmission: null,
    submission: null,
    status: 'idle',
    error: null,
};

// Async thunk to get submissions (either by studentId or assignmentId)
export const getSubmissionsAsync = createAsyncThunk<Submission[], { studentId?: number; assignmentId?: number }, { rejectValue: string }>(
    'submissions/getSubmissions',
    async (params, { rejectWithValue }) => {
        try {
            const { studentId, assignmentId } = params;
            const token = getToken();
            const queryString = studentId
                ? `studentId=${studentId}`
                : assignmentId
                ? `assignmentId=${assignmentId}`
                : '';
            const response = await fetch(`http://localhost:5000/api/submissions/get-submissions?${queryString}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data: Submission[] = await response.json();

            if (!response.ok) {
                throw new Error('Failed to fetch submissions');
            }
            return data;
        } catch (error) {
            console.error('Error fetching submissions:', error);
            return rejectWithValue('Network error while fetching submissions');
        }
    }
);

// Async thunk to submit an assignment
export const submitAssignmentAsync = createAsyncThunk<Submission, Submission, { rejectValue: string }>(
    'submissions/submitAssignment',
    async (submission, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await fetch(`http://localhost:5000/api/submissions/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submission),
            });
            const data: Submission = await response.json();

            if (!response.ok) {
                throw new Error('Failed to submit assignment');
            }
            return data;
        } catch (error) {
            console.error('Error submitting assignment:', error);
            return rejectWithValue('Network error while submitting assignment');
        }
    }
);

// Async thunk to update a submission (e.g., adding grade or feedback)
export const updateSubmissionAsync = createAsyncThunk<Submission, Partial<Submission>, { rejectValue: string }>(
    'submissions/updateSubmission',
    async (submission, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await fetch(`http://localhost:5000/api/submissions/update-submission`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(submission),
            });
            const data: Submission = await response.json();

            if (!response.ok) {
                throw new Error('Failed to update submission');
            }
            return data;
        } catch (error) {
            console.error('Error updating submission:', error);
            return rejectWithValue('Network error while updating submission');
        }
    }
);

// Async thunk to delete a submission
export const deleteSubmissionAsync = createAsyncThunk<string, string, { rejectValue: string }>(
    'submissions/deleteSubmission',
    async (submissionId, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await fetch(`http://localhost:5000/api/submissions/delete-submission?submissionId=${submissionId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete submission');
            }
            return submissionId;
        } catch (error) {
            console.error('Error deleting submission:', error);
            return rejectWithValue('Network error while deleting submission');
        }
    }
);

const submissionSlice = createSlice({
    name: 'submissions',
    initialState,
    reducers: {
        resetSubmissions: (state) => {
            state.submissions = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get Submissions
            .addCase(getSubmissionsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSubmissionsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.submissions = action.payload;
            })
            .addCase(getSubmissionsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch submissions';
            })
            // Submit Assignment
            .addCase(submitAssignmentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitAssignmentAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.submissions.push(action.payload);
            })
            .addCase(submitAssignmentAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to submit assignment';
            })
            // Update Submission
            .addCase(updateSubmissionAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSubmissionAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.submissions.findIndex((s) => s.submissionId === action.payload.submissionId);
                if (index !== -1) {
                    state.submissions[index] = { ...state.submissions[index], ...action.payload };
                }
            })
            .addCase(updateSubmissionAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to update submission';
            })
            // Delete Submission
            .addCase(deleteSubmissionAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteSubmissionAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.submissions = state.submissions.filter((s) => s.submissionId !== action.payload);
            })
            .addCase(deleteSubmissionAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to delete submission';
            });
    },
});

export const { resetSubmissions } = submissionSlice.actions;

export default submissionSlice.reducer;
