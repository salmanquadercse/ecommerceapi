
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';
import { loadTheme } from './store/themeSlice';

function App() {
  useEffect(() => {
    // Apply theme class to body
    const theme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-bs-theme', theme);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
