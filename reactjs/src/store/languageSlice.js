import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLang: localStorage.getItem('lang') || 'en',
  languages: [
    { code: 'en', name: 'English' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'es', name: 'Español' }
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
export default languageSlice.reducer;