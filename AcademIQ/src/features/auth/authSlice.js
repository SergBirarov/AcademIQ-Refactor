import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import { getToken, setToken, removeToken } from '../../utils/GeneralHelpers';
import  persistor  from '../../store/Persistor';

export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async ({ UserId, PasswordHash }) => {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserId, PasswordHash }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const {authToken, user} = await  response.json();
      console.log("loginAsync response", authToken, user);
      setToken(authToken);

      return { authToken, user };
    }
  );

  export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (_, { rejectWithValue }) => {
      const token = getToken();
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const {Role_Code} = decodedToken;
          let endpoint = Role_Code === 3 ? '/api/students/profile' : '/api/instructors/profile';          

          const response = await fetch(`http://localhost:5000${endpoint}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          console.log("fetchUserData response", response);
        if (!response.ok) {
          return rejectWithValue('Failed to fetch user data');
        }

        const profile = await response.json();
        console.log("fetchUserData profile", profile);
        return profile;
        } catch (error) {
          return rejectWithValue('Network error');
        }
      } else {
        return rejectWithValue('No token available');
      }
    }
  );

export const signOut = createAsyncThunk('auth/signOut', async () => {
  removeToken();
  await persistor.purge();
});
  
  const initialState = {
    user: null,
    isAuthenticated: false,
    token: getToken(),
    status: 'idle',
    error: null,
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      signOut(state) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        removeToken();
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
          console.log('Login successful: ', action.payload);
          const { authToken } = action.payload; // Updated to match API response
          state.token = authToken;
          state.isAuthenticated = true;
          state.status = 'succeeded';
        })
        .addCase(loginAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(fetchUserData.pending, (state) => {
          console.log('Fetching user data...');

          state.status = 'loading';
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          console.log('User data fetched successfully: ', action.payload);
          state.user = action.payload;
          state.isAuthenticated = true; // Make sure authentication status is set
          state.status = 'succeeded';
        })
        .addCase(fetchUserData.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || action.error.message; // Handle both rejectWithValue and action.error cases
        });
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;