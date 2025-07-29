// src/store/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: localStorage.getItem('theme') || 'light'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
    }
  }
});

// Export the action
export const { toggleTheme } = themeSlice.actions;

// Export the selector
export const selectTheme = (state) => state.theme;

export default themeSlice.reducer;