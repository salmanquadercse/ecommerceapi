// src/features/language/languageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLang: localStorage.getItem('lang') || 'en',
  languages: [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }
    // Add more languages as needed
  ]
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLang = action.payload;
      localStorage.setItem('lang', action.payload);
    }
  }
});

export const { setLanguage } = languageSlice.actions;

// Selectors
export const selectCurrentLang = (state) => state.language.currentLang;
export const selectLanguages = (state) => state.language.languages;

export default languageSlice.reducer;