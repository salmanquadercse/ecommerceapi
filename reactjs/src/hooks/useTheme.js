// src/hooks/useTheme.js
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';

export function useTheme() {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return {
    mode,
    toggleTheme: () => dispatch(toggleTheme())
  };
}