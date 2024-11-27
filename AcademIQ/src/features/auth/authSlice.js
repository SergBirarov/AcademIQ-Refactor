import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { setToken, removeToken } from '../../utils/GeneralHelpers';
import  persistor  from '../../store/Persistor';

function roleNames(state, user){
  if(user.Role === 1){
    state.role = 'Staff';
  }else if(user.Role === 2){
    state.role = 'Instructor';
  }else if(user.Role === 3){
    state.role = 'Student';
  }
}

export const loginAsync = createAsyncThunk(
  
    'auth/loginAsync',
    async ({ UserId, PasswordHash }) => {
      
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
      const {message, token, user, role} = await  result.json();
      console.log(message)
      setToken(token);
      console.log(`fetchUserData profile: `, user, token);

      return { token, user, role, message };
    }
  );


export const signOut = createAsyncThunk('auth/signOut', async () => {
  removeToken();
  await persistor.purge();
});
  
  const initialState = {
    user: null,
    isAuthenticated: false,
    token: null,
    role: null,
    status: 'idle',
    message: null,
    error: null,
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      signOut(state) {
        state.user = null;
        state.token = null;
        state.status = 'idle';
        state.role = null;
        state.message = null;
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
          const { message, token, user, role} = action.payload;
          console.log('Login successful: ', token, user);
          state.message = message;
          state.token = token;
          state.user = user;
          state.role = roleNames(role, state, user);
          state.isAuthenticated = true;
          state.status = 'succeeded';
        })
        .addCase(loginAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          state.message = action.payload.message;
        })
      
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;