import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getToken, setToken, removeToken } from '../../utils/GeneralHelpers';
import  persistor  from '../../store/Persistor';

export const loginAsync = createAsyncThunk(
  
    'auth/loginAsync',
    async ({ UserId, PasswordHash }) => {
      
      const userRes = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserId, PasswordHash }),
      });
      console.log(userRes);
      if (!userRes.ok) {
        throw new Error('Login failed');
      }
      const {authToken, id, role} = await  userRes.json();
      setToken(authToken);
      // const decodedToken = jwtDecode(authToken);
      // const role = decodedToken.Role_Code;
      console.log("loginAsync userRes", authToken, id, role);
      console.log("fetching profile...");

      let endpoint = null;

          if (role === 3) {
            endpoint = '/api/students/profile';
          }
           else if (role === 2) {
            endpoint = '/api/instructors/profile';
          }
           else if (role === 1) {
            endpoint = '/api/staff/profile';
          }      

          console.log(`http://localhost:5000${endpoint}`);

          const fetchResponse = await fetch(`http://localhost:5000${endpoint}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
          });

          if(!fetchResponse.ok) {
            throw new Error('Failed to fetch user profile');
          }

          console.log("fetchUserData response", fetchResponse);

          const user = await fetchResponse.json();
          console.log("fetchUserData profile", user);

      return { authToken, user, role };
    }
  );

  // export const fetchUserData = createAsyncThunk(
  //   'auth/fetchUserData',
  //   async (_, { rejectWithValue }) => {
  //     const token = getToken();
  //     if (token) {
  //       try {
  //         const decodedToken = jwtDecode(token);
  //         const {Role_Code} = decodedToken;
  //         let endpoint = null;

  //         if (Role_Code === '3') {
  //           endpoint = '/api/students';
  //         } else if (Role_Code === '2') {
  //           endpoint = '/api/instructors';
  //         } else if (Role_Code === '1') {
  //           endpoint = '/api/staff';
  //         }      

  //         const response = await fetch(`http://localhost:5000${endpoint}`, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${token}`,
  //           },
  //         });
  //         console.log("fetchUserData response", response);
  //       if (!response.ok) {
  //         return rejectWithValue('Failed to fetch user data');
  //       }

  //       const profile = await response.json();
  //       console.log("fetchUserData profile", profile);
  //       return profile;
  //       } catch (error) {
  //         return rejectWithValue('Network error');
  //       }
  //     } else {
  //       return rejectWithValue('No token available');
  //     }
  //   }
  // );

export const signOut = createAsyncThunk('auth/signOut', async () => {
  removeToken();
  await persistor.purge();
});
  
  const initialState = {
    user: null,
    isAuthenticated: false,
    token: getToken(),
    role: null,
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
        state.role = null;
        state.status = 'idle';
        state.error = null;
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
          const { authToken, user, role } = action.payload;
          console.log('Login successful: ', authToken, user, role);
          state.isAuthenticated = true;
          state.token = authToken;
          state.role = role;
          state.user = user;
          state.status = 'succeeded';
        })
      //   .addCase(loginAsync.rejected, (state, action) => {
      //     state.status = 'failed';
      //     state.error = action.error.message;
      //   })
      //   .addCase(fetchUserData.pending, (state) => {
      //     console.log('Fetching user data...');

      //     state.status = 'loading';
      //   })
      //   .addCase(fetchUserData.fulfilled, (state, action) => {
      //     console.log('User data fetched successfully: ', action.payload);
      //     state.user = action.payload;
      //     state.role = 
      //     state.isAuthenticated = true; // Make sure authentication status is set
      //     state.status = 'succeeded';
      //   })
      //   .addCase(fetchUserData.rejected, (state, action) => {
      //     state.status = 'failed';
      //     state.error = action.payload || action.error.message; // Handle both rejectWithValue and action.error cases
      //   }
      // );
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;