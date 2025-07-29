// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';
import languageReducer from '../features/language/languageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});