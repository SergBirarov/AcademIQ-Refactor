import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from '../../src/utils/GeneralHelpers';


export interface Task {
    TaskId?: number; // Auto-generated
    Title: string;
    Description?: string;
    DueDate?: Date;
    CreatedBy: number; // Reference to UserId from Users table
    IsCompleted?: boolean;
    CourseId?: number;
    CourseName?: string;
    UserId?: number;
  }

  interface TaskState {
    tasks: Task[];
    updatedTask: Partial<Task>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  }

  const initialState: TaskState = {
    tasks: [],
    updatedTask: {},
  status: 'idle',
  error: null,
  }


  export const getTasksAsync = createAsyncThunk<Task[], { userId?: number; courseId?: number}, { rejectValue: string }>(
    'task/getAlltasks',
    async (params, { rejectWithValue }) => {
      try {
        const queryParams = new URLSearchParams();
      if (params?.userId) queryParams.append('userId', params.userId.toString());
      if (params?.courseId) queryParams.append('courseId', params.courseId.toString());
      console.log('http://localhost:5000/api/tasks/get-student-tasks?' + queryParams + '');
      

        const response = await fetch('http://localhost:5000/api/tasks/get-student-tasks?' + queryParams + '', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
          },
          
        });
        console.log(response);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch courses');
          }

        const data: Task[] = await response.json();
        console.log(data);
        if (!Array.isArray(data)) {
            throw new Error('Unexpected response format: data should be an array of tasks');
          }
       
        return data;
      } catch (error: any) {
        console.error('Error fetching students:', error);
        return rejectWithValue('Network error while fetching tasks');
      }
    }
  );

  // Thunk to add a new task
export const addTaskAsync = createAsyncThunk<Task, Task, { rejectValue: string }>(
    'task/addTask',
    async (task, { rejectWithValue }) => {
      try {
        console.log("addTask: " + task)
        const response = await fetch('http://localhost:5000/api/tasks/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
          },
          body: JSON.stringify(task),
        });
        console.log(response)
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add task');
        }
  
        const data: Task = await response.json();
        console.log(data);
        return data;
      } catch (error: any) {
        console.error('Error adding task:', error);
        return rejectWithValue('Network error while adding task');
      }
    }
  );
  
  // Thunk to update a task
  export const updateTaskAsync = createAsyncThunk<Task, Task, { rejectValue: string }>(
    'task/updateTask',
    async (task, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:5000/api/tasks/update-task', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
          },
          body: JSON.stringify(task),
        });
        console.log("updatedTask response from slice: ", response);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update task');
        }
  
        const data: Task = await response.json();
        console.log("updatedTask from slice: ", data);
        return data;
      } catch (error: any) {
        console.error('Error updating task:', error);
        return rejectWithValue('Network error while updating task');
      }
    }
  );
  
  // Thunk to delete a task
  export const deleteTaskAsync = createAsyncThunk<number, number, { rejectValue: string }>(
    'task/deleteTask',
    async (taskId, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/delete-task/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getToken()}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete task');
        }
  
        return taskId;
      } catch (error: any) {
        console.error('Error deleting task:', error);
        return rejectWithValue('Network error while deleting task');
      }
    }
  );
  
  // Slice to manage the state
  const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getTasksAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getTasksAsync.fulfilled, (state, action: PayloadAction<Task[]>) => {
          state.status = 'succeeded';
          state.tasks = action.payload;
        })
        .addCase(getTasksAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Failed to fetch tasks';
        })
        .addCase(addTaskAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(addTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
          state.status = 'succeeded';
          state.tasks.push(action.payload);
        })
        .addCase(addTaskAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Failed to add task';
        })
        .addCase(updateTaskAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
          state.status = 'succeeded';
          const index = state.tasks.findIndex((task) => task.TaskId === action.payload.TaskId);
          console.log(index);
          console.log(action.payload);
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        })
        .addCase(updateTaskAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Failed to update task';
        })
        .addCase(deleteTaskAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(deleteTaskAsync.fulfilled, (state, action: PayloadAction<number>) => {
          state.status = 'succeeded';
          state.tasks = state.tasks.filter((task) => task.TaskId !== action.payload);
        })
        .addCase(deleteTaskAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Failed to delete task';
        });
    },
  });
  
  export default taskSlice.reducer;