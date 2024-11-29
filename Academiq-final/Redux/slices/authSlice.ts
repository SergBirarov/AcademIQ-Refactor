import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setToken, removeToken } from '../../src/utils/GeneralHelpers';
import persistor from '../Persistor';

interface User {
  UserId: number;
  Role: string;
  Picture_URL?: string;
  [key: string]: any; 
}

interface AuthState {
  user: User | null;
  token: string | null;
  role: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  message: string | null;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
  status: 'idle',
  message: null,
  error: null,
  isAuthenticated: false,
};

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ UserId, PasswordHash }: { UserId: number; PasswordHash: string }, { rejectWithValue }) => {
    console.log("UserId: " + UserId + " PasswordHash: " + PasswordHash);
    try {
      const result = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserId, PasswordHash }),
      });

      console.log(result);

      if (!result.ok) {
        throw new Error('Login failed');
      }

      const { message, token, user, role } = await result.json();
      setToken(token);
      return { message, token, user, role };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOutAsync = createAsyncThunk('auth/signOut', async () => {
  removeToken();
  console.log("Starting signOutAsync...");
  try {
    await persistor.purge();
    console.log("Persistor purged successfully");
  } catch (error) {
    console.log("Error purging persistor:", error);
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<{ token: string; user: User; message: string }>) => {
        state.message = action.payload.message;
        state.role = action.payload.user.Role
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.status = 'succeeded';
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.user = null;
    state.token = null;
    state.role = null;
    state.status = 'idle';
    state.message = null;
    state.error = null;
    state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
