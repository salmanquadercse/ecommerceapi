// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Helper to set auth headers
const setAuthHeaders = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Initialize from localStorage
const token = localStorage.getItem('jwt_token');
if (token) {
  setAuthHeaders(token);
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Registration failed');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      if (!token) return rejectWithValue('No token available');
      
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch user');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
      // Still proceed with logout even if API fails
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: token || null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.error = null;
        localStorage.setItem('jwt_token', action.payload.access_token);
        setAuthHeaders(action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.payload?.error || 'Login failed';
      })
      
      // Register cases
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.error = null;
        localStorage.setItem('jwt_token', action.payload.access_token);
        setAuthHeaders(action.payload.access_token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.payload?.error || 'Registration failed';
      })
      
      // Fetch user cases
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        // Auto-logout if token is invalid
        state.token = null;
        state.user = null;
        localStorage.removeItem('jwt_token');
        setAuthHeaders(null);
      })
      
      // Logout cases
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem('jwt_token');
        setAuthHeaders(null);
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem('jwt_token');
        setAuthHeaders(null);
      });
  }
});

export const { clearAuthError } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;