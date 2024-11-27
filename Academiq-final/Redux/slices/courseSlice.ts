import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from '../../src/utils/GeneralHelpers';
import { CourseType } from '../../src/types/MyTypes.type';
// Define the Course type interface
// interface Course {
//   id: number;
//   name: string;
//   instructor: string;
//   description: string;
//   [key: string]: any; // To support any additional properties
// }

// Define the initial state for the slice
interface CoursesState {
  courses: CourseType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  status: 'idle',
  error: null,
};

// Thunk to get all courses asynchronously (for Admin and Instructors)
export const getCoursesAsync = createAsyncThunk<CourseType[], { userId?: string; userType?: string; active?: string; classRoomRequired?: boolean } | undefined, { rejectValue: string }>(
  'courses/getCourses',
  async (params, { rejectWithValue }) => {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      if (params?.userId) queryParams.append('userId', params.userId);
      if (params?.userType) queryParams.append('userType', params.userType);
      if (params?.active) queryParams.append('active', params.active);
      if (params?.classRoomRequired !== undefined) queryParams.append('classRoomRequired', params.classRoomRequired ? 'true' : 'false');

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

      const data: CourseType[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Unexpected response format: data should be an array of courses');
      }

      return data;
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      return rejectWithValue(error.message || 'Network error while fetching courses');
    }
  }
);

// Initial state of the courses slice
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
      // Handle pending state
      .addCase(getCoursesAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear previous errors during new request
      })
      // Handle fulfilled state
      .addCase(getCoursesAsync.fulfilled, (state, action: PayloadAction<CourseType[]>) => {
        state.courses = action.payload;
        state.status = 'succeeded';
      })
      // Handle rejected state
      .addCase(getCoursesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Failed to fetch courses';
      });
  },
});

// Export the synchronous action creators
export const { resetCourses } = courseSlice.actions;

// Export the reducer to use in the store
export default courseSlice.reducer;
