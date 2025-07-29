// src/components/layout/ThemeToggle.jsx
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { mode } = useTheme();

  return (
    <button 
      className={`btn btn-${mode === 'dark' ? 'light' : 'dark'} ms-2`}
      onClick={() => dispatch(toggleTheme())}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {mode === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
}