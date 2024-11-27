import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../utils/GeneralHelpers';

// Thunk to get all courses asynchronously (for Admin and Instructors)
export const getCoursesAsync = createAsyncThunk(
    'courses/getCourses',
    async ({ userId, userType, active, classRoomRequired } = {}, { rejectWithValue }) => {
        try {
            // Build query parameters
            const queryParams = new URLSearchParams();
            if (userId) queryParams.append('userId', userId);
            if (userType) queryParams.append('userType', userType);
            if (active) queryParams.append('active', active);
            if (classRoomRequired !== undefined) queryParams.append('classRoomRequired', classRoomRequired ? 'true' : 'false');

            // Construct the URL with query parameters
            const url = `http://localhost:5000/api/courses/course-information?${queryParams.toString()}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch courses');
            }

            const data = await response.json();
            console.log(data);

            if (!Array.isArray(data)) {
                throw new Error('Unexpected response format: data should be an array of courses');
            }

            return data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            return rejectWithValue(error.message || 'Network error while fetching courses');
        }
    }
);

// // Thunk to get active courses (for Students or Instructors)
// export const getActiveCoursesAsync = createAsyncThunk(
//     'courses/getActiveCourses',
//     async ({  id, role }, { rejectWithValue }) => {
//         try {
//             const queryParams = new URLSearchParams({
//                 UserId: id,
//                 UserType: role,
//             });
//             console.log("getActiveCourses query params", queryParams)
//             const response = await fetch(`http://localhost:5000/api/courses/my-courses?${queryParams.toString()}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${getToken()}`,
//                 }
//                         });
//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.message || 'Failed to fetch active courses');
//             }
//             return data;
//         } catch (error) {
//             console.error('Error fetching active courses:', error);
//             return rejectWithValue(error.message || 'Network error while fetching active courses');
//         }
//     }
// );

// // Thunk to get specific course details (by courseId)
// export const getCourseDetailsAsync = createAsyncThunk(
//     'courses/getCourseDetails',
//     async ({ courseId }, { rejectWithValue }) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${getToken()}`,
//                 },
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.message || 'Failed to fetch course details');
//             }
//             return data;
//         } catch (error) {
//             console.error('Error fetching course details:', error);
//             return rejectWithValue(error.message || 'Network error while fetching course details');
//         }
//     }
// );

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
            // All Courses (Admin and Instructor)
            .addCase(getCoursesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCoursesAsync.fulfilled, (state, action) => {
                console.log("redducer", action.payload);
                state.courses = action.payload; 
                state.status = 'succeeded';
            })
            .addCase(getCoursesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })

            // // Active Courses (Students and Instructors)
            // .addCase(getActiveCoursesAsync.pending, (state) => {
            //     state.status = 'loading';
            // })
            // .addCase(getActiveCoursesAsync.fulfilled, (state, action) => {
            //     state.activeCourses = action.payload;
            //     state.status = 'succeeded';
            // })
            // .addCase(getActiveCoursesAsync.rejected, (state, action) => {
            //     state.status = 'failed';
            //     state.error = action.payload || action.error.message;
            // })

            // // Specific Course Details
            // .addCase(getCourseDetailsAsync.pending, (state) => {
            //     state.status = 'loading';
            // })
            // .addCase(getCourseDetailsAsync.fulfilled, (state, action) => {
            //     state.courseDetails = action.payload;
            //     state.status = 'succeeded';
            // })
            // .addCase(getCourseDetailsAsync.rejected, (state, action) => {
            //     state.status = 'failed';
            //     state.error = action.payload || action.error.message;
            // });
    },
});

// Export the synchronous action creators
export const { resetCourses } = courseSlice.actions;

// Export the reducer to use in the store
export default courseSlice.reducer;
