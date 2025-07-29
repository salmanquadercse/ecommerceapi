// src/hooks/useLanguage.js
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentLang, selectLanguages, setLanguage } from '../features/language/languageSlice';

export function useLanguage() {
  const currentLang = useSelector(selectCurrentLang);
  const languages = useSelector(selectLanguages);
  const dispatch = useDispatch();

  return {
    currentLang,
    languages,
    setLanguage: (langCode) => dispatch(setLanguage(langCode))
  };
}